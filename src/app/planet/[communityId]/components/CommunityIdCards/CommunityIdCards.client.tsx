'use client';

import { useEffect } from 'react';
import { Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetCommunityIdCards } from '~/api/domain/community.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { IdCard } from '~/modules/IdCard';
import { CommunityIdCardsModel } from '~/types/community';

type CommunityIdCardsProps = {
  communityId: number;
};

export const CommunityIdCardsComponent = ({ communityId }: CommunityIdCardsProps) => {
  const { data: communityIdCards, fetchNextPage } = useGetCommunityIdCards(communityId);
  const { ref, inView } = useInView();
  const isEmpty = communityIdCards?.pages[0].content.length === 0;

  useEffect(() => {
    if (inView && communityIdCards?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, communityIdCards?.pages]);

  return (
    <div className="px-5">
      {isEmpty || (
        <div className="flex flex-col gap-18pxr pb-18pxr">
          <h3 className="text-h3 text-grey-800">우리 행성 주민을 소개할게요!</h3>
          {communityIdCards?.pages.map(page => {
            return page.content.map((idCard: CommunityIdCardsModel) => {
              return <IdCard key={idCard.idCardId} {...idCard} />;
            });
          })}
        </div>
      )}
      <div ref={ref}></div>
    </div>
  );
};

export const CommunityIdCards = ({ communityId }: CommunityIdCardsProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <CommunityIdCardsComponent communityId={communityId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

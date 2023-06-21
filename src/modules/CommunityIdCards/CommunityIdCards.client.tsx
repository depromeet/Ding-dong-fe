'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetCommunityIdCards } from '~/api/domain/community.api';
import { IdCard } from '~/modules/IdCard';
import { CommunityIdCardsModel } from '~/types/community';

type CommunityIdCardsProps = {
  communityId: string;
};

export const CommunityIdCards = ({ communityId }: CommunityIdCardsProps) => {
  const { data: communityIdCards, fetchNextPage } = useGetCommunityIdCards({
    communityId,
    pageParam: 1,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && communityIdCards?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, communityIdCards?.pages]);

  return (
    <div className="flex flex-col gap-18pxr px-[27px]">
      <h3 className="-mt-28pxr text-h3 text-grey-800">우리 행성 주민을 소개할게요!</h3>
      {communityIdCards?.pages.map(page => {
        return page.communityIdCardsDtos.content.map((idCard: CommunityIdCardsModel) => {
          return <IdCard key={idCard.idCardId} {...idCard} />;
        });
      })}
      <div ref={ref}></div>
    </div>
  );
};

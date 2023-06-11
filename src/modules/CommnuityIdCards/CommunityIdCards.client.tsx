'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetCommunityIdCards } from '@/hooks/api/community.query';
import { IdCard } from '@/modules/IdCard';
import { CommunityIdCardsModel } from '@/types/community';

export const CommunityIdCards = () => {
  // TODO: 커뮤니티 id 값 수정해야함
  const { data: communityIdCards, fetchNextPage } = useGetCommunityIdCards({
    id: '1',
    pageParam: 1,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && communityIdCards?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, communityIdCards?.pages]);

  return (
    <div className="flex flex-col gap-18pxr">
      {communityIdCards?.pages.map(page => {
        return page.data?.communityIdCardsDtos.content.map((idCard: CommunityIdCardsModel) => {
          return <IdCard key={idCard.idCardId} {...idCard} />;
        });
      })}
      <div ref={ref}></div>
    </div>
  );
};

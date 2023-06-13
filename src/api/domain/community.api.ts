import { useInfiniteQuery } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { CommunityDetailResponse, CommunityIdCardsResponse } from '~/types/community';
import { CommunityIdCardsRequest } from '~/types/community/request.type';

export const COMMUNITY_KEYS = {
  COMMUNITY_ID_CARDS: 'getCommunityIdCards',
};

export const getCommunityIdCards = ({ id, pageParam }: CommunityIdCardsRequest) =>
  privateApi.get<CommunityIdCardsResponse>(`/communities/${id}/idCards?page=${pageParam}&size=10`);

export const useGetCommunityIdCards = ({ id, pageParam }: CommunityIdCardsRequest) => {
  return useInfiniteQuery(
    [COMMUNITY_KEYS.COMMUNITY_ID_CARDS, { id, pageParam }],
    ({ pageParam = 0 }) => getCommunityIdCards({ id, pageParam }),
    {
      getNextPageParam: data =>
        !data.communityIdCardsDtos.hasNext ? data.communityIdCardsDtos.page + 1 : undefined,
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

export const getCommunityDetail = (id: string) =>
  privateApi.get<CommunityDetailResponse>(`/communities/${id}`);

import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import {
  CommunityDetailResponse,
  CommunityIdCardsResponse,
  CommunityListResponse,
} from '~/types/community';
import { CommunityIdCardsRequest } from '~/types/community/request.type';

export const communityQueryKey = {
  idCards: (communityId: string, pageParam: number) => [
    'getCommunityIdCards',
    communityId,
    pageParam,
  ],
  communityList: (userId: string) => ['getCommunityList', userId],
};

export const getCommunityIdCard = async (id: number) => {
  return privateApi.get(`communities/${id}/idCards`);
};

export const getCommunityIdCards = ({ communityId, pageParam }: CommunityIdCardsRequest) =>
  privateApi.get<CommunityIdCardsResponse>(
    `/communities/${communityId}/idCards?page=${pageParam}&size=10`,
  );

export const useGetCommunityIdCards = ({ communityId, pageParam }: CommunityIdCardsRequest) => {
  return useInfiniteQuery(
    communityQueryKey.idCards(communityId, pageParam),
    ({ pageParam = 0 }) => getCommunityIdCards({ communityId, pageParam }),
    {
      getNextPageParam: data =>
        !data.communityIdCardsDtos.hasNext ? data.communityIdCardsDtos.page + 1 : undefined,
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

export const getCommunityDetail = (communityId: string) =>
  privateApi.get<CommunityDetailResponse>(`/communities/${communityId}`);

export const getCommunityList = (userId: string) =>
  privateApi.get<CommunityListResponse>(`/communities/users/${userId}`);

export const useGetCommunityList = (userId: string) => {
  return useQuery(communityQueryKey.communityList(userId), () => getCommunityList(userId));
};

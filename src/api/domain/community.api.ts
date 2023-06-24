import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import privateApi from '~/api/config/privateApi';
import {
  CommunityDetailResponse,
  CommunityIdCardsResponse,
  CommunityListResponse,
  CommunityUpdateResponse,
} from '~/types/community';
import { CommunityIdCardsRequest, CreateCommunityRequest } from '~/types/community/request.type';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

export const communityQueryKey = {
  idCards: (communityId: number) => ['communityIdCards', communityId],
  communityList: (userId: number) => ['communityList', userId],
};

export const getCommunityIdCard = async (id: number) => {
  return privateApi.get(`/communities/${id}/idCards`);
};

export const getCommunityIdCards = ({ communityId, pageParam = 0 }: CommunityIdCardsRequest) =>
  privateApi.get<CommunityIdCardsResponse>(
    `/communities/${communityId}/idCards?page=${pageParam}&size=10`,
  );

export const useGetCommunityIdCards = (communityId: number) => {
  return useInfiniteQuery(
    communityQueryKey.idCards(communityId),
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

export const getCommunityDetail = (communityId: number) =>
  privateApi.get<CommunityDetailResponse>(`/communities/${communityId}`);

export const getCommunityList = (userId: number) =>
  privateApi.get<CommunityListResponse>(`/communities/users/${userId}`);

export const useGetCommunityList = (userId: number) => {
  return useQuery(communityQueryKey.communityList(userId), () => getCommunityList(userId));
};

export const postCommunityCreate = (community: CreateCommunityRequest) =>
  privateApi.post<CommunityUpdateResponse>(`/communities`, community);

export const usePostCommunityCreate = () => {
  const queryClient = useQueryClient();
  const userId = getUserIdClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (community: CreateCommunityRequest) => postCommunityCreate(community),
    onSuccess: () => {
      queryClient.invalidateQueries(communityQueryKey.communityList(userId));
      //TODO: BE 응답형태 변경 후 반영
      router.replace('/admin/community/create/result');
    },
  });
};
export const postCommunityUpdate = (communityId: number, community: CreateCommunityRequest) =>
  privateApi.put<CommunityUpdateResponse>(`/communities/${communityId}`, community);

export const usePostCommunityUpdate = (communityId: number) => {
  const queryClient = useQueryClient();
  const userId = getUserIdClient();

  return useMutation({
    mutationFn: (community: CreateCommunityRequest) => postCommunityUpdate(communityId, community),
    onSuccess: () => {
      queryClient.invalidateQueries(communityQueryKey.communityList(userId));
    },
  });
};

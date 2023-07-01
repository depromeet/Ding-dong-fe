import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import privateApi from '~/api/config/privateApi';
import publicApi from '~/api/config/publicApi';
import { userQueryKey } from '~/api/domain/user.api';
import {
  CommunityDetailResponse,
  CommunityIdCardsResponse,
  CommunityListResponse,
  CommunityUpdateResponse,
  InvitationCodeValidationResponse,
} from '~/types/community';
import {
  CommunityIdCardsRequest,
  CommunityJoinRequest,
  CreateCommunityRequest,
} from '~/types/community/request.type';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

export const communityQueryKey = {
  idCards: (communityId: number) => ['communityIdCards', communityId],
  communityList: (userId: number) => ['communityList', userId],
  invitationCodeIsValid: () => ['invitaion', 'code', 'valid'],
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryClient.invalidateQueries(communityQueryKey.communityList(userId!));
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryClient.invalidateQueries(communityQueryKey.communityList(userId!));
    },
  });
};

export const getInvitationCodeIsValid = async (invitationCode: string) => {
  return await publicApi.get<InvitationCodeValidationResponse>(`/communities/join`, {
    params: { code: invitationCode },
  });
};

export const useGetInvitationCodeIsValid = (invitationCode: string) =>
  useQuery(communityQueryKey.invitationCodeIsValid(), () =>
    getInvitationCodeIsValid(invitationCode),
  );

export const postCommunityJoin = async (communityId: CommunityJoinRequest) => {
  return await privateApi.post<InvitationCodeValidationResponse>(`/communities/join`, communityId);
};

export const usePostCommunityJoin = (
  options?: Omit<UseMutationOptions<unknown, AxiosError, CommunityJoinRequest>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, CommunityJoinRequest>({
    mutationFn: postCommunityJoin,
    onSuccess: () => queryClient.invalidateQueries(userQueryKey.userInfo()),
    ...options,
  });
};

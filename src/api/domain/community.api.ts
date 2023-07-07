import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import privateApi from '~/api/config/privateApi';
import { userQueryKey } from '~/api/domain/user.api';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import {
  CheckIdCardResponse,
  CommunityDetailResponse,
  CommunityIdCardsResponse,
  CommunityListResponse,
  CommunityNameCheckResponse,
  CommunityUpdateResponse,
  CommunityUserInfoResponse,
  InvitationCodeValidationResponse,
} from '~/types/community';
import {
  CommunityIdCardsRequest,
  CommunityJoinRequest,
  CreateCommunityRequest,
} from '~/types/community/request.type';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

import { ApiError } from '../config/customError';

export const communityQueryKey = {
  idCards: (communityId: number) => ['communityIdCards', communityId],
  communityList: (userId: number) => ['communityList', userId],
  invitationCodeIsValid: () => ['invitaion', 'code', 'valid'],
  communityDetail: (communityId: number) => ['communityDetail', communityId],
  checkIdCard: (communityId: number) => ['checkIdCard', communityId],
  communityUserInfo: (communityId: number) => ['communityUserInfo', communityId],
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
      getNextPageParam: data => (data.hasNext ? data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

export const getCommunityDetail = (communityId: number) =>
  privateApi.get<CommunityDetailResponse>(`/communities/${communityId}`);

export const useGetCommunityDetail = (communityId: number) =>
  useQuery(communityQueryKey.communityDetail(communityId), () => getCommunityDetail(communityId));

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
    onSuccess: data => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryClient.invalidateQueries(communityQueryKey.communityList(userId!));
      router.replace(`/admin/planet/create/result?communityId=${data.id}`);
    },
  });
};
export const postCommunityUpdate = (communityId: number, community: CreateCommunityRequest) =>
  privateApi.put<CommunityUpdateResponse>(`/communities/${communityId}`, community);

export const usePostCommunityUpdate = (communityId: number) => {
  const queryClient = useQueryClient();
  const userId = getUserIdClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (community: CreateCommunityRequest) => postCommunityUpdate(communityId, community),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryClient.invalidateQueries(communityQueryKey.communityList(userId!));
      router.replace(`/admin/planet/${communityId}`);
    },
  });
};

export const getInvitationCodeIsValid = async (invitationCode: string) => {
  return await privateApi.get<InvitationCodeValidationResponse>(`/communities/validate`, {
    params: { code: invitationCode },
  });
};

export const useGetInvitationCodeIsValid = (
  invitationCode: string,
  options?: UseQueryOptions<InvitationCodeValidationResponse>,
) =>
  useQuery<InvitationCodeValidationResponse>(
    communityQueryKey.invitationCodeIsValid(),
    () => getInvitationCodeIsValid(invitationCode),
    options,
  );

export const postCommunityJoin = async (communityId: CommunityJoinRequest) => {
  return await privateApi.post<InvitationCodeValidationResponse>(`/communities/join`, communityId);
};

export const usePostCommunityJoin = (
  options?: Omit<UseMutationOptions<unknown, ApiError, CommunityJoinRequest>, 'mutationFn'>,
) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, ApiError, CommunityJoinRequest>({
    mutationFn: postCommunityJoin,
    onSuccess: () => queryClient.invalidateQueries(userQueryKey.userInfo()),
    ...options,
  });
};

export const checkCommunityName = (communityName: string) =>
  privateApi.get<CommunityNameCheckResponse>('/communities/check', {
    params: {
      name: communityName,
    },
  });

export const checkIdCard = (communityId: number) =>
  privateApi.get<CheckIdCardResponse>(`/communities/${communityId}/users`);

export const useCheckIdCards = (communityId: number) =>
  useQuery(communityQueryKey.checkIdCard(communityId), () => checkIdCard(communityId));

export const getCommunityUserInfo = (communityId: number) =>
  privateApi.get<CommunityUserInfoResponse>(`/communities/${communityId}/my-info`);

export const useGetCommunityUserInfo = (communityId: number) =>
  useQuery(communityQueryKey.communityUserInfo(communityId), () =>
    getCommunityUserInfo(communityId),
  );

export const withdrawalCommunity = (communityId: number) =>
  privateApi.put(`/communities/${communityId}/withdrawal`);

export const useWithdrawalCommunity = (communityId: number) => {
  const queryClient = useQueryClient();
  const userId = getUserIdClient();
  const router = useRouter();
  const { infoToast, errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: () => withdrawalCommunity(communityId),
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryClient.invalidateQueries(communityQueryKey.communityList(userId!));
      router.push('/my-page');
      infoToast('행성을 떠났어요.');
    },
    onError: (error: AxiosError) => {
      errorToast(`${error.message}`);
    },
  });
};

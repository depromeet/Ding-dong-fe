import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import {
  CommunityMyIdCardDetailResponse,
  EditIdCardRequest,
  IdCardCreateRequest,
  IdCardDetailResponse,
  IdCardEditResponse,
} from '~/types/idCard';

export const idCardQueryKey = {
  idCards: (idCardId: number) => ['IdCardDetail', idCardId],
  myCommunity: (communityId: number) => ['CommunityMyIdCard', communityId],
};

export const getIdCardDetail = (idCardId: number) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

export const useGetIdCardDetail = (
  idCardId: number,
  options?: UseQueryOptions<IdCardDetailResponse>,
) =>
  useQuery<IdCardDetailResponse>(
    idCardQueryKey.idCards(idCardId),
    () => getIdCardDetail(idCardId),
    options,
  );

export const getCommunityMyIdCardDetail = (communityId: number) =>
  privateApi.get<CommunityMyIdCardDetailResponse>(`/communities/${communityId}/users/idCards`);

export const useGetCommunityMyIdCardDetail = (
  communityId: number,
  options?: UseQueryOptions<CommunityMyIdCardDetailResponse>,
) =>
  useQuery<CommunityMyIdCardDetailResponse>(
    idCardQueryKey.myCommunity(communityId),
    () => getCommunityMyIdCardDetail(communityId),
    options,
  );

export const editIdCardDetail = (idCardInfo: EditIdCardRequest) => {
  const { idCardId, profileImageUrl, nickname, aboutMe, keywords } = idCardInfo;
  return privateApi.put<IdCardEditResponse>(`/id-cards/${idCardId}`, {
    profileImageUrl,
    nickname,
    aboutMe,
    keywords,
  });
};

export const useEditIdCardDetail = (communityId: number) => {
  const queryClient = useQueryClient();

  return useMutation<IdCardEditResponse, AxiosError, EditIdCardRequest>({
    mutationFn: (idCardInfo: EditIdCardRequest) => editIdCardDetail(idCardInfo),
    onSuccess: (data: IdCardEditResponse) => {
      queryClient.invalidateQueries(idCardQueryKey.myCommunity(communityId));
      queryClient.invalidateQueries(idCardQueryKey.idCards(data.id));
    },
  });
};

export const postIdCardCreate = (IdCardInfo: IdCardCreateRequest) =>
  privateApi.post<IdCardEditResponse>(`/id-cards`, IdCardInfo);

export const usePostIdCardCreate = (
  options?: Omit<
    UseMutationOptions<IdCardEditResponse, AxiosError, IdCardCreateRequest>,
    'mutationFn'
  >,
) =>
  useMutation<IdCardEditResponse, AxiosError, IdCardCreateRequest>({
    mutationFn: postIdCardCreate,
    ...options,
  });

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import privateApi from '~/api/config/privateApi';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { CharacterCreateRequest, UserInfoResponse } from '~/types/user';

export const userQueryKey = {
  userInfo: () => ['userInfo'],
  invitationCodeIsValid: () => ['invitation', 'code', 'valid'],
};

export const getUserInfo = () => privateApi.get<UserInfoResponse>(`/user/profile`);

export const useGetUserInfo = (options?: UseQueryOptions<UserInfoResponse>) =>
  useQuery<UserInfoResponse>(userQueryKey.userInfo(), () => getUserInfo(), options);

export const postCharacterCreate = (characterName: CharacterCreateRequest) =>
  privateApi.post(`/user/character`, { character: characterName });

export const usePostCharacterCreate = (
  options?: Omit<UseMutationOptions<unknown, AxiosError, CharacterCreateRequest>, 'mutationFn'>,
) =>
  useMutation<unknown, AxiosError, CharacterCreateRequest>({
    mutationFn: postCharacterCreate,
    ...options,
  });

export const deleteUser = () => privateApi.delete(`/user`);

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { infoToast, errorToast } = useToastMessageStore();

  return useMutation<unknown, AxiosError>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(userQueryKey.userInfo());
      router.replace(`/`);
      infoToast('회원탈퇴가 완료되었습니다.');
    },
    onError: (error: AxiosError) => {
      errorToast(`${error.message}`);
    },
  });
};

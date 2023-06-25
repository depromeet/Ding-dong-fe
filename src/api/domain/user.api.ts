import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { CharacterCreateRequest } from '~/types/character';
import { UserInfoResponse } from '~/types/user';

export const userQueryKey = {
  userInfo: () => ['userInfo'],
};

export const getUserInfo = () => privateApi.get<UserInfoResponse>(`/user/profile`);

export const useGetUserInfo = () => useQuery(userQueryKey.userInfo(), () => getUserInfo());

export const postCharacterCreate = (characterName: CharacterCreateRequest) =>
  privateApi.post(`/user/character`, { character: characterName });

export const usePostCharacterCreate = (
  options?: Omit<UseMutationOptions<unknown, AxiosError, CharacterCreateRequest>, 'mutationFn'>,
) =>
  useMutation<unknown, AxiosError, CharacterCreateRequest>({
    mutationFn: postCharacterCreate,
    ...options,
  });

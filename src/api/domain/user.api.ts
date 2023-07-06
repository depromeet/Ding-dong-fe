import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { CharacterCreateRequest } from '~/types/user';
import { UserInfoResponse } from '~/types/user';

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

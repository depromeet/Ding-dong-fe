import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { InvitationCodeValidationResponse, PlanetJoinRequest } from '~/types/user';
import { CharacterCreateRequest } from '~/types/user';
import { UserInfoResponse } from '~/types/user';

import publicApi from '../config/publicApi';

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

export const getInvitationCodeIsValid = async (invitationCode: string) => {
  return await publicApi.get<InvitationCodeValidationResponse>(`/invitation/${invitationCode}`);
};

export const postPlanetJoin = async (body: PlanetJoinRequest) => {
  return await privateApi.post<InvitationCodeValidationResponse>(`/join/planet`, body);
};

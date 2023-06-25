import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CharacterCreateRequest } from '~/types/character';

import privateApi from '../config/privateApi';

export const postCharacterCreate = (characterName: CharacterCreateRequest) =>
  privateApi.post(`/user/character`, { character: characterName });

export const usePostCharacterCreate = (
  options?: Omit<UseMutationOptions<unknown, AxiosError, CharacterCreateRequest>, 'mutationFn'>,
) =>
  useMutation<unknown, AxiosError, CharacterCreateRequest>({
    mutationFn: postCharacterCreate,
    ...options,
  });

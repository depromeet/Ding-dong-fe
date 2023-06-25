import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { CharacterCreateRequest } from '~/types/character';

import privateApi from '../config/privateApi';

export const postCharacterCreate = (name: CharacterCreateRequest) =>
  privateApi.post(`/character`, { name });

export const usePostCharacterCreate = (
  options?: Omit<UseMutationOptions<unknown, AxiosError, CharacterCreateRequest>, 'mutationFn'>,
) =>
  useMutation<unknown, AxiosError, CharacterCreateRequest>({
    mutationFn: postCharacterCreate,
    ...options,
  });

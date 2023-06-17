import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { IdCardCreateRequest, IdCardCreateResponse, IdCardDetailResponse } from '~/types/idCard';

export const getIdCardDetail = (idCardId: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

export const postIdCardCreate = (IdCardInfo: IdCardCreateRequest) =>
  privateApi.post<IdCardCreateResponse>(`/id-cards`, IdCardInfo);

export const usePostIdCardCreate = (
  options?: Omit<
    UseMutationOptions<IdCardCreateResponse, AxiosError, IdCardCreateRequest>,
    'mutationFn'
  >,
) =>
  useMutation<IdCardCreateResponse, AxiosError, IdCardCreateRequest>({
    mutationFn: postIdCardCreate,
    ...options,
  });

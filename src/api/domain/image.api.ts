import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { ImageFileRequest } from '~/types/image/request.type';
import { IamgeUrlResponse } from '~/types/image/response.type';

export const postImageUrl = (imageFile: ImageFileRequest) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  return privateApi.post<IamgeUrlResponse>('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const usePostImageUrl = (
  options?: Omit<UseMutationOptions<IamgeUrlResponse, AxiosError, ImageFileRequest>, 'mutationFn'>,
) =>
  useMutation<IamgeUrlResponse, AxiosError, ImageFileRequest>({
    mutationFn: postImageUrl,
    ...options,
  });

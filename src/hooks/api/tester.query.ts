import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BaseResponseType, ErrorResponseType } from '~/lib/api/config/api.types';
import testerApi from '~/lib/api/domain/tester.api';

export const useGetTester = () =>
  useQuery<
    BaseResponseType<{ tester: { id: string; nickname: string } }>,
    AxiosError<ErrorResponseType>
  >({
    queryKey: ['tester'],
    queryFn: () => testerApi.getTester(),
  });

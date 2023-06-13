import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponseType } from '~/api/config/api.types';
import testerApi from '~/api/domain/tester.api';

export const useGetTester = () =>
  useQuery<{ tester: { id: string; nickname: string } }, AxiosError<ErrorResponseType>>({
    queryKey: ['tester'],
    queryFn: () => testerApi.getTester(),
  });

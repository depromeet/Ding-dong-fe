'use client';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { useState } from 'react';

import { ToastMessageProvider } from '~/components/ToastMessage';
import initMocks from '~/mocks';
import { isUnauthorizedError } from '~/utils/auth/error';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enable') {
  initMocks();
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  // TODO: react-query에 필요한 default option 추가하기
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: error => {
            if (isUnauthorizedError(error)) {
              router.push('/auth/signin');
            }
          },
        }),
      }),
  );

  return (
    <>
      <SessionProvider basePath="/auth">
        <QueryClientProvider client={queryClient}>
          <ToastMessageProvider />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};

export default Provider;

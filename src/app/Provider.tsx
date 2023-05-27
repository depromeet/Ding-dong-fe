'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

import initMocks from '@/mocks';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks();
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  // TODO: react-query에 필요한 default option 추가하기
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Provider;

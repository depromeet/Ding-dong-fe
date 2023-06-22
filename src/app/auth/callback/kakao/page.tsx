'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLogin } from '~/api/domain/auth.api.client';

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authData = useLogin(code, {
    onSuccess: () => {
      router.push('/');
    },
  });

  return <></>;
};

export default KakaoCallbackPage;

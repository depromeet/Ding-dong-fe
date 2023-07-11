'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { useLogin } from '~/api/domain/auth.api.client';
import { generateCookiesKeyValues } from '~/utils/auth/tokenHandlers';

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const authData = useLogin(code, {
    onSuccess: data => {
      for (const [cookieKey, cookieValue] of generateCookiesKeyValues(data)) {
        document.cookie = `${cookieKey}=${cookieValue}; path=/;`;
      }
      router.push('/');
    },
  });

  return <></>;
};

export default KakaoCallbackPage;

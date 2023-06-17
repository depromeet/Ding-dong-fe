'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import publicApi from '~/api/config/publicApi';
import { AuthResponse } from '~/types/auth';
import { generateCookiesKeyValues } from '~/utils/auth/tokenHandlers';

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const code = searchParams.get('code');
  const { data } = useQuery<AuthResponse>(['login'], async () => {
    const host = window.location.protocol + '//' + window.location.host;
    const authData = await publicApi.post<AuthResponse>('/auth/login/kakao', {
      authCode: code,
      redirectUri: `${host}/auth/callback/kakao`,
    });
    if (authData.data) {
      const cookies = generateCookiesKeyValues(authData.data as AuthResponse);
      cookies.forEach(([key, value]) => {
        document.cookie = `${key}=${value}; path=/;`;
      });
      router.replace('/');
    }

    return authData;
  });
  useEffect(() => {
    if (data?.accessToken) {
      router.replace('/');
    }
  }, [data, router]);

  return <></>;
};

export default KakaoCallbackPage;

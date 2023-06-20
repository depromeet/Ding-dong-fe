import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { AuthResponse } from '~/types/auth';
import { generateCookiesKeyValues } from '~/utils/auth/tokenHandlers';

import publicApi from '../config/publicApi';

export const login = async (code: string | null) => {
  const origin = window.location.origin;
  const authData = await publicApi.post<AuthResponse>('/auth/login/kakao', {
    authCode: code,
    redirectUri: `${origin}/auth/callback/kakao`,
  });
  if (authData.data) {
    const cookies = generateCookiesKeyValues(authData.data as AuthResponse);
    cookies.forEach(([key, value]) => {
      document.cookie = `${key}=${value}; path=/;`;
    });
  }

  return authData;
};

export const useLogin = (code: string | null, options?: UseQueryOptions<AuthResponse>) => {
  return useQuery<AuthResponse>(['login'], async () => login(code), options);
};

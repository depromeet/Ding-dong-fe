import { ClientSafeProvider } from 'next-auth/react';

export const KAKAO_PROVIDER: ClientSafeProvider = {
  callbackUrl: '/auth/callback/kakao',
  id: 'kakao',
  name: 'Kakao',
  type: 'oauth',
  signinUrl: '/auth/signin/kakao',
};

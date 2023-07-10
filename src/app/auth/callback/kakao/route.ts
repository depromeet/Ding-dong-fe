import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

import publicApi from '~/api/config/publicApi';
import { AuthResponse } from '~/types/auth';
import { generateCookiesKeyValues } from '~/utils/auth/tokenHandlers';

export async function GET(request: NextRequest) {
  const authCode = request.nextUrl.searchParams.get('code');

  if (!authCode) {
    // TODO: 에러 메시지 고도화: 카카오 인증 실패
    redirect(`/auth/signin`);
  }

  const origin = request.nextUrl.origin;
  const authData = await publicApi.post<AuthResponse>('/auth/login/kakao', {
    authCode,
    redirectUri: `${origin}/auth/callback/kakao`,
  });

  // TODO: error처리 고도화: response status혹은 메시지에 따라 if문 수정하기
  if (!authData) {
    // TODO: 에러 메시지 고도화: 로그인 실패
    redirect(`/auth/signin`);
  }

  const cookieStore = cookies();
  for (const cookie of generateCookiesKeyValues(authData as AuthResponse)) {
    const cookieKey = cookie[0];
    const cookieValue = cookie[1] as string | number;
    cookieStore.set(cookieKey, cookieValue.toString());
  }
  redirect(`/`);
}

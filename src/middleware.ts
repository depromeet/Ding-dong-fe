import { NextRequest, NextResponse } from 'next/server';

import { ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { AuthResponseType } from '@/types/auth';

import { FetchResponseType } from './lib/api/config/api.types';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/auth/callback/kakao')) {
    const authCode = request.nextUrl.searchParams.get('code');

    if (!authCode) {
      // 로그아웃 요청 분기
      return NextResponse.redirect(new URL('/', request.url));
    }
    const authResponse = await fetch(`${ROOT_API_URL}/auth/login/kakao?authCode=${authCode}`);
    if (!authResponse.ok) {
      // 로그인 에러 처리
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const authJson: FetchResponseType<AuthResponseType> = await authResponse.json();

    const { data, success } = authJson;
    if (!success) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('accessToken', data.accessToken);
    response.cookies.set('refreshToken', data.refreshToken);
    const now = new Date();
    now.setSeconds(now.getSeconds() + data.accessTokenExpireDate);
    response.cookies.set('accessTokenExpireDate', now.toString());
    response.cookies.set('userId', data.userId.toString());
    return response;
  }
  if (request.nextUrl.pathname.startsWith('/accounts')) {
    const requestHeaders = new Headers(request.headers);
    const accessToken = request.cookies.get('accessToken')?.value;
    const accessTokenExpireDateTime = new Date(
      request.cookies.get('accessTokenExpireDate')?.value ?? '',
    ).getTime();
    const isAccessTokenExpired =
      isNaN(accessTokenExpireDateTime) ??
      accessTokenExpireDateTime - new Date().getTime() < ACCESS_TOKEN_EXPIRE_MARGIN_SECOND;
    if (accessToken && !isAccessTokenExpired) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
      console.log('accessToken', accessToken);
      console.log(requestHeaders);
    } else if (isAccessTokenExpired) {
      // token refresh 로직 처리
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    return NextResponse.next();
  }
};

const config = {
  matcher: ['/auth/callback/kakao/(.*)', 'accounts'],
};
export { config, middleware };

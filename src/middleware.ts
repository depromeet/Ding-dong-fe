import { NextRequest, NextResponse } from 'next/server';

import { ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { AUTH_COOKIE_KEYS, AuthResponse } from '@/types/auth';

import { FetchResponseType } from './lib/api/config/api.types';
import { generateCookiesKeyValues, getAccessToken } from './utils/auth/tokenHandlers';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

// Authorization이 필요한 페이지 경로를 저장합니다.
const PRIVATE_ROUTES = ['/accounts'];

const middleware = async (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith('/auth/callback/kakao')) {
    const authCode = request.nextUrl.searchParams.get('code');

    if (!authCode) {
      // TODO: 에러 메시지 고도화: 카카오 인증 실패
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    const authResponse = await fetch(`${ROOT_API_URL}/auth/login/kakao?authCode=${authCode}`);

    if (!authResponse.ok) {
      // TODO: 에러 메시지 고도화: 서버 로그인 실패
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const authJson: FetchResponseType<AuthResponse> = await authResponse.json();
    const { data, success } = authJson;
    if (!success) {
      // TODO: 에러 메시지 고도화: 서버 로그인 데이터 파싱 실패
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    const response = NextResponse.redirect(new URL('/', request.url));
    for (const [cookieKey, cookieValue] of generateCookiesKeyValues(data)) {
      response.cookies.set(cookieKey, cookieValue.toString());
    }
    return response;
  }

  // 인증이 필요한 페이지
  for (let i = 0; i < PRIVATE_ROUTES.length; i++) {
    if (request.nextUrl.pathname.startsWith(PRIVATE_ROUTES[i])) {
      const requestHeaders = new Headers(request.headers);
      const accessToken = request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;
      const accessTokenExpireDate = Number(
        request.cookies.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
      );
      const validAccessToken = getAccessToken({ accessToken, accessTokenExpireDate });
      if (validAccessToken) {
        requestHeaders.set('Authorization', `Bearer ${accessToken}`);
        return NextResponse.next();
      }
      // server-side 로그아웃 처리
      for (const cookieKey of Object.values(AUTH_COOKIE_KEYS)) {
        request.cookies.delete(cookieKey);
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/auth/callback/kakao/(.*)', ...PRIVATE_ROUTES],
};
export { config, middleware };

import { NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_KEYS, AuthResponse } from '@/types/auth';

import { PublicFetch } from './lib/api/config/publicFetch';
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

    const { data, success } = await PublicFetch.get<AuthResponse>(
      `/auth/login/kakao?authCode=${authCode}`,
    );
    if (!success || !data) {
      // TODO: 에러 메시지 고도화: 로그인 실패
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
      const validAccessToken = await getAccessToken({ accessToken, accessTokenExpireDate });
      if (validAccessToken) {
        requestHeaders.set('Authorization', `Bearer ${accessToken}`);
        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });
        return response;
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

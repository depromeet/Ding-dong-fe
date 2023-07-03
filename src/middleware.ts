import { NextRequest, NextResponse } from 'next/server';

import publicApi from '~/api/config/publicApi';
import { AUTH_COOKIE_KEYS, AuthResponse } from '~/types/auth';
// import { UserInfoResponse } from '~/types/user';
import { generateCookiesKeyValues } from '~/utils/auth/tokenHandlers';

import { ROUTE_COOKIE_KEYS } from './utils/route/route';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

// Authorization이 필요한 페이지 경로를 저장합니다.
const PRIVATE_ROUTES = ['/accounts'];

const getAccessToken = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;

const getAuthRequestHeaders = (request: NextRequest, accessToken: string) => {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  return requestHeaders;
};

const logout = (request: NextRequest) => {
  // server-side 로그아웃 처리
  for (const cookieKey of Object.values(AUTH_COOKIE_KEYS)) {
    request.cookies.delete(cookieKey);
  }
};

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const accessToken = getAccessToken(request);
    if (accessToken) {
      // TO DO: BE 도메인 정상화 이후 복원
      // https://github.com/vercel/next.js/discussions/49246 관련 이슈로 privateApi가 아닌 publicApi 사용해야함
      // const { characterType, communityIds } = await publicApi.get<UserInfoResponse>(
      //   `/user/profile`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   },
      // );

      const characterType = 'BUDDY'; // mock data
      const communityIds = [1]; // mock data

      const redirectUri = request.cookies.get(ROUTE_COOKIE_KEYS.redirectUri)?.value;
      if (redirectUri?.includes('invitation')) {
        const response = NextResponse.redirect(new URL(redirectUri, request.url));
        response.cookies.delete(ROUTE_COOKIE_KEYS.redirectUri);
        return response;
      }

      if (characterType) {
        if (redirectUri) {
          const response = NextResponse.redirect(new URL(redirectUri, request.url));
          response.cookies.delete(ROUTE_COOKIE_KEYS.redirectUri);
          return response;
        }

        return communityIds.length > 0
          ? NextResponse.redirect(new URL(`/planet/${communityIds[0]}`, request.url))
          : NextResponse.redirect(new URL('/planet', request.url));
      }
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  if (pathname.startsWith('/auth/callback/kakao')) {
    const authCode = request.nextUrl.searchParams.get('code');

    if (!authCode) {
      // TODO: 에러 메시지 고도화: 카카오 인증 실패
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }

    try {
      const origin = request.nextUrl.origin;
      const authData = await publicApi.post<AuthResponse>('/auth/login/kakao', {
        authCode,
        redirectUri: `${origin}/auth/callback/kakao`,
      });
      console.log('authData', authData);

      // TODO: error처리 고도화: response status혹은 메시지에 따라 if문 수정하기
      if (!authData) {
        // TODO: 에러 메시지 고도화: 로그인 실패
        return NextResponse.redirect(new URL('/auth/signin', request.url));
      }

      const response = NextResponse.redirect(new URL('/', request.url));
      for (const cookie of generateCookiesKeyValues(authData as AuthResponse)) {
        const cookieKey = cookie[0];
        const cookieValue = cookie[1] as string | number;
        response.cookies.set(cookieKey, cookieValue.toString());
      }
      return response;
    } catch (e) {
      // server-side 로그인 실패
      //TODO: server-side fetch CORS 에러 핸들링
      console.log('middleware error', e);
    }
  }

  // 인증이 필요한 페이지
  const currentPrivateRoute = PRIVATE_ROUTES.find(route =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (currentPrivateRoute) {
    const accessToken = getAccessToken(request);

    if (accessToken) {
      const requestHeaders = getAuthRequestHeaders(request, accessToken);
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
      return response;
    }
    logout(request);
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/auth/callback/kakao/(.*)', '/', ...PRIVATE_ROUTES],
};
export { config, middleware };

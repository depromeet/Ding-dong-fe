import { NextRequest, NextResponse } from 'next/server';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

const getAccessToken = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  if (pathname === '/') {
    const accessToken = getAccessToken(request);
    if (accessToken) {
      const response = await fetch(`${ROOT_API_URL}/user/profile`, {
        method: 'GET',
        headers: new Headers({
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }),
        mode: 'no-cors',
        credentials: 'include',
      });

      if (!response.ok) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl.origin));
      }
      const data = await response.json();

      const { characterType, communityIds } = data.data.userProfileDto;

      const redirectUri = request.cookies.get(ROUTE_COOKIE_KEYS.redirectUri)?.value;
      if (redirectUri?.includes('invitation')) {
        const response = NextResponse.redirect(new URL(redirectUri, request.nextUrl.origin));
        response.cookies.delete(ROUTE_COOKIE_KEYS.redirectUri);
        return response;
      }

      if (characterType) {
        if (redirectUri) {
          const response = NextResponse.redirect(new URL(redirectUri, request.nextUrl.origin));
          response.cookies.delete(ROUTE_COOKIE_KEYS.redirectUri);
          return response;
        }

        const currentCommunityId = request.cookies.get('communityId')?.value;
        if (currentCommunityId)
          return NextResponse.redirect(
            new URL(`/planet/${currentCommunityId}`, request.nextUrl.origin),
          );
        return communityIds.length > 0
          ? NextResponse.redirect(
              new URL(`/planet/${communityIds[communityIds.length - 1]}`, request.nextUrl.origin),
            )
          : NextResponse.redirect(new URL('/planet', request.nextUrl.origin));
      }
      return NextResponse.redirect(new URL('/onboarding', request.nextUrl.origin));
    }
    return NextResponse.redirect(new URL('/auth/signin', request.nextUrl.origin));
  }

  if (pathname === '/my-page') {
    try {
      const accessToken = getAccessToken(request);

      if (accessToken) {
        const response = await fetch(`${ROOT_API_URL}/user/profile`, {
          method: 'GET',
          headers: new Headers({
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          }),
          mode: 'no-cors',
          credentials: 'include',
        });
        if (!response.ok) {
          return NextResponse.redirect(new URL('/auth/signin', request.url));
        }
        const data = await response.json();

        const { communityIds } = data.data.userProfileDto;
        const currentCommunityId = request.cookies.get('communityId')?.value;

        if (currentCommunityId) {
          return NextResponse.redirect(new URL(`/my-page/${currentCommunityId}`, request.url));
        } else if (communityIds.length !== 0)
          return NextResponse.redirect(
            new URL(`/my-page/${communityIds[communityIds.length - 1]}`, request.url),
          );
        else return NextResponse.redirect(new URL('/my-page/empty', request.url));
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    } catch (e) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/'],
};
export { config, middleware };

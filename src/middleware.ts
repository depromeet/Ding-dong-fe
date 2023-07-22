import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { NextRequest, NextResponse } from 'next/server';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { DEFAULT_SELECT_PLANET_INDEX } from '~/constant/planet';
import { AUTH_COOKIE_KEYS, AuthResponse } from '~/types/auth';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

import { PrivateFetch } from './api/fetch/privateFetch';
import { generateCookiesKeyValues } from './utils/auth/tokenHandlers';
import { getFetch, postFetch } from './utils/fetch';
import { DINGDONG_PLANET } from './utils/variable';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

const getAccessToken = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;

const getRefreshToken = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.refreshToken)?.value;

const getExpireDate = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value;

const privatePages = /^\/(admin|invitation|my-page|notification|onboarding|planet)/;

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  const accessToken = getAccessToken(request);
  const refreshToken = getRefreshToken(request);
  const expireDate = getExpireDate(request);

  if (privatePages.test(pathname)) {
    const privateFetch = new PrivateFetch({ accessToken, refreshToken });
    const isExpired = new Date().getTime() > Number(expireDate) - ACCESS_TOKEN_EXPIRE_MARGIN_SECOND;
    if (isExpired && refreshToken) {
      try {
        const { data: refreshResponse } = await privateFetch.get<AuthResponse>(
          '/auth/login/reissue',
          {
            headers: { 'REFRESH-TOKEN': refreshToken ?? '' },
          },
        );
        const response = NextResponse.next();
        for (const [cookieKey, cookieValue] of generateCookiesKeyValues(refreshResponse)) {
          response.cookies.set(cookieKey, cookieValue as string);
        }
        return response;
      } catch (e) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl.origin));
      }
    } else if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/signin', request.nextUrl.origin));
    }
  }
  if (pathname === '/') {
    const accessToken = getAccessToken(request);
    if (accessToken) {
      try {
        const data = await getFetch('/user/profile', accessToken);

        const { characterType, communityIds } = data.data.userProfileDto;
        let redirectUri = request.cookies.get(ROUTE_COOKIE_KEYS.redirectUri)?.value;
        if (redirectUri?.includes('invitation')) {
          const paths = redirectUri.split('/');
          const invitationCode = paths[paths.length - 1];
          const queryString = new URLSearchParams({ code: invitationCode }).toString();
          const checkInvitationData = await getFetch(
            `/communities/validate?${queryString}`,
            accessToken,
          );
          const { communityId } = checkInvitationData.data.checkInvitationCodeDto;
          await postFetch(`/communities/join`, accessToken, { communityId });

          redirectUri = `/planet/${communityId}`;
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
          return communityIds.length > 1
            ? NextResponse.redirect(
                new URL(
                  `/planet/${communityIds[DEFAULT_SELECT_PLANET_INDEX]}`,
                  request.nextUrl.origin,
                ),
              )
            : NextResponse.redirect(new URL('/planet', request.nextUrl.origin));
        }
        const response = NextResponse.redirect(new URL('/onboarding', request.url));
        redirectUri && response.cookies.set(ROUTE_COOKIE_KEYS.redirectUri, redirectUri);
        return response;
      } catch (e) {
        return NextResponse.redirect(new URL('/auth/signin', request.nextUrl.origin));
      }
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
            new URL(`/my-page/${communityIds[DEFAULT_SELECT_PLANET_INDEX]}`, request.url),
          );
        else return NextResponse.redirect(new URL('/my-page/empty', request.url));
      }
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    } catch (e) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  if (pathname === `/planet/${DINGDONG_PLANET.DINGDONG_PLANET_ID}/id-card/create`) {
    return NextResponse.redirect(
      new URL(`/planet/${DINGDONG_PLANET.DINGDONG_PLANET_ID}`, request.url),
    );
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/'],
};
export { config, middleware };

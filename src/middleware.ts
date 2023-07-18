import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';
import { NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE_KEYS, AuthResponse } from '~/types/auth';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

import { publicFetch } from './api/fetch/publicFetch';
import { UserInfoResponse } from './types/user';
import { generateCookiesKeyValues } from './utils/auth/tokenHandlers';
import { getFetch, postFetch } from './utils/fetch';

export const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

const getAccessToken = (request: NextRequest) =>
  request.cookies.get(AUTH_COOKIE_KEYS.accessToken)?.value;

const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

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
          return communityIds.length > 0
            ? NextResponse.redirect(
                new URL(`/planet/${communityIds[communityIds.length - 1]}`, request.nextUrl.origin),
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
        const data = await publicFetch.get<UserInfoResponse>('/user/profile', {
          headers: { Authorization: `Bearer ${accessToken}` },
          credentials: 'include',
        });
        if (!data) return NextResponse.redirect(new URL('/auth/signin', request.url));

        const { communityIds } = data.userProfileDto;
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
  if (pathname.startsWith('/auth/callback/kakao')) {
    const authCode = request.nextUrl.searchParams.get('code');
    if (!authCode) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
    try {
      const origin = request.nextUrl.origin;
      const authData = await publicFetch.post<AuthResponse>('/auth/login/kakao', {
        body: JSON.stringify({ authCode, redirectUri: `${origin}/auth/callback/kakao` }),
      });

      if (!authData) {
        throw new Error('authData is null');
      }

      const res = NextResponse.redirect(new URL('/', request.url));
      for (const cookie of generateCookiesKeyValues(authData as AuthResponse)) {
        const cookieKey = cookie[0];
        const cookieValue = cookie[1] as string | number;
        res.cookies.set(cookieKey, cookieValue.toString());
      }
      return res;
    } catch (e) {
      console.log(e);
    }
  }
};

const config = {
  // middleware가 적용될 페이지를 설정해 두어야 SC에서의 api 요청이 정상적으로 작동합니다.
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/'],
};
export { config, middleware };

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privateApi } from '~/api/config/privateApi.server';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { UserInfoResponse } from '~/types/user';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    if (accessToken) {
      // TO DO: BE 도메인 정상화 이후 복원 + privateApi로 변경
      const { userProfileDto } = await privateApi.get<UserInfoResponse>(`/user/profile`);
      const { characterType, communityIds } = userProfileDto;

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
          ? NextResponse.redirect(
              new URL(`/planet/${communityIds[communityIds.length - 1]}`, request.url),
            )
          : NextResponse.redirect(new URL('/planet', request.url));
      }
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  } catch (e) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

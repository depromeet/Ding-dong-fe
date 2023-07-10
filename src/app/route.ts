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
      const { userProfileDto } = await privateApi.get<UserInfoResponse>(`/user/profile`);
      const { characterType, communityIds } = userProfileDto;

      const redirectUri = cookieStore.get(ROUTE_COOKIE_KEYS.redirectUri)?.value;
      if (redirectUri?.includes('invitation')) {
        cookieStore.set({
          name: ROUTE_COOKIE_KEYS.redirectUri,
          value: '',
        });
        return NextResponse.redirect(`${request.nextUrl.origin}${redirectUri}`);
      }

      if (characterType) {
        if (redirectUri) {
          cookieStore.set({
            name: ROUTE_COOKIE_KEYS.redirectUri,
            value: '',
          });
          return NextResponse.redirect(redirectUri);
        }

        return communityIds.length > 0
          ? NextResponse.redirect(
              `${request.nextUrl.origin}/planet/${communityIds[communityIds.length - 1]}`,
            )
          : NextResponse.redirect(`${request.nextUrl.origin}/planet`);
      }
      return NextResponse.redirect(`${request.nextUrl.origin}/onboarding`);
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/signin`);
  } catch (e) {
    console.log('error', e);
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/signin`);
  }
}

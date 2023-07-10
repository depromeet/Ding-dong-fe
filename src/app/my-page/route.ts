import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privateApi } from '~/api/config/privateApi.server';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { UserInfoResponse } from '~/types/user';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    if (accessToken) {
      const { userProfileDto } = await privateApi.get<UserInfoResponse>(`/user/profile`);
      const { communityIds } = userProfileDto;

      if (communityIds.length !== 0) {
        return NextResponse.redirect(
          `${request.nextUrl.origin}/my-page/${communityIds[communityIds.length - 1]}`,
        );
      }
      return NextResponse.redirect(`${request.nextUrl.origin}/my-page/empty`);
    }
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/signin`);
  } catch (e) {
    return NextResponse.redirect(`${request.nextUrl.origin}/auth/signin`);
  }
}

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
      // TO DO: BE 도메인 정상화 이후 복원 + privateApi로 변경
      const { userProfileDto } = await privateApi.get<UserInfoResponse>(`/user/profile`);
      const { communityIds } = userProfileDto;

      if (communityIds.length !== 0)
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

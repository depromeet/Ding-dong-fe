import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { privateApi } from '~/api/config/privateApi.server';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { InvitationCodeValidationResponse } from '~/types/community';
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

      let redirectUri = request.cookies.get(ROUTE_COOKIE_KEYS.redirectUri)?.value;
      if (redirectUri?.includes('invitation')) {
        // 로그인하고 초대코드로 돌아왔으므로
        // 여기서 가입 시키고 communityId 값 알아내서 + error 300 처리도 해야 함
        // redirectUri를 다시 저장함
        const paths = redirectUri.split('/');
        const invitationCode = paths[paths.length - 1];
        const {
          checkInvitationCodeDto: { communityId },
        } = await privateApi.get<InvitationCodeValidationResponse>(`/communities/validate`, {
          params: { code: invitationCode },
        });

        // 300 error code 처리하기
        try {
          await privateApi.post(`/communities/join`, {
            communityId,
          });
        } catch (error) {
          if (error.response.status !== 300) {
            throw new Error('error');
          }
        }
        redirectUri = `/planet/${communityId}`;
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
      const response = NextResponse.redirect(new URL('/onboarding', request.url));
      redirectUri && response.cookies.set(ROUTE_COOKIE_KEYS.redirectUri, redirectUri);
      return response;
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  } catch (e) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }
}

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { privateApi } from '~/api/config/privateApi.server';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { UserInfoResponse } from '~/types/user';
import { ROUTE_COOKIE_KEYS } from '~/utils/route/route';

export async function GET() {
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
      redirect(redirectUri);
    }

    if (characterType) {
      if (redirectUri) {
        cookieStore.set({
          name: ROUTE_COOKIE_KEYS.redirectUri,
          value: '',
        });
        redirect(redirectUri);
      }

      return communityIds.length > 0
        ? redirect(`/planet/${communityIds[communityIds.length - 1]}`)
        : redirect(`/planet`);
    }
    redirect(`/onboarding`);
  }
  redirect(`/auth/signin`);
}

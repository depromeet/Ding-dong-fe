import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { privateApi } from '~/api/config/privateApi.server';
import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { UserInfoResponse } from '~/types/user';

export async function GET() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
  if (accessToken) {
    const { userProfileDto } = await privateApi.get<UserInfoResponse>(`/user/profile`);
    const { communityIds } = userProfileDto;

    if (communityIds.length !== 0) {
      redirect(`/my-page/${communityIds[communityIds.length - 1]}`);
    }
    redirect(`/my-page/empty`);
  }
  redirect(`/auth/signin`);
}

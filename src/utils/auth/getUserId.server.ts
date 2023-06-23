import { cookies } from 'next/headers';

import { AUTH_COOKIE_KEYS } from '~/types/auth';

export const getUserIdServer = (): number | undefined => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get(AUTH_COOKIE_KEYS.userId)?.value;
    if (!userId) return undefined;
    const userIdNumber = Number(userId);
    return isNaN(userIdNumber) ? undefined : userIdNumber;
  } catch (e) {
    return undefined;
  }
};

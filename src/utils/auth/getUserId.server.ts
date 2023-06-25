import { cookies } from 'next/headers';

import { AUTH_COOKIE_KEYS } from '~/types/auth';

import { UserIdNotFoundError } from './error';

export const getUserIdServer = (): number => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get(AUTH_COOKIE_KEYS.userId)?.value;
    if (userId === undefined) throw new UserIdNotFoundError();
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) throw new UserIdNotFoundError();
    return userIdNumber;
  } catch (e) {
    return -1;
  }
};

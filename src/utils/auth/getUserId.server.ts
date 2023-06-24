import { cookies } from 'next/headers';

import { AUTH_COOKIE_KEYS } from '~/types/auth';

import { UserIdNotFoundError } from './error';

export const getUserIdServer = (): number => {
  try {
    const cookieStore = cookies();
    const userId = cookieStore.get(AUTH_COOKIE_KEYS.userId)?.value;
    if (userId === undefined) throw new Error();
    const userIdNumber = Number(userId);
    if (isNaN(userIdNumber)) throw new Error();
    return userIdNumber;
  } catch (e) {
    throw new UserIdNotFoundError();
  }
};

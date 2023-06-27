import { UserIdNotFoundError } from './error';
import { getAuthTokensByCookie } from './tokenHandlers';

export const getUserIdClient = (): number => {
  try {
    if (typeof document === 'undefined') throw new UserIdNotFoundError();
    const { userId } = getAuthTokensByCookie(document.cookie);
    if (userId !== undefined) return userId;
    throw new UserIdNotFoundError();
  } catch (e) {
    return -1;
  }
};

export const getUserIdClientTemp = (): number | undefined => {
  try {
    if (typeof document === 'undefined') throw new UserIdNotFoundError();
    const { userId } = getAuthTokensByCookie(document.cookie);
    if (userId !== undefined) return userId;
    return undefined;
  } catch (e) {
    return -1;
  }
};

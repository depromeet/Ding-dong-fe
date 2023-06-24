import { UserIdNotFoundError } from './error';
import { getAuthTokensByCookie } from './tokenHandlers';

export const getUserIdClient = (): number => {
  const { userId } = getAuthTokensByCookie(document.cookie);
  if (userId !== undefined) return userId;
  throw new UserIdNotFoundError();
};

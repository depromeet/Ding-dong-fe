import { getAuthTokensByCookie } from './tokenHandlers';

export const getUserIdClient = (): number | undefined => {
  const { userId } = getAuthTokensByCookie(document.cookie);
  return userId;
};

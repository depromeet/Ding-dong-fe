import { getAuthTokensByCookie } from './tokenHandlers';

export const getUserIdClient = () => {
  const { userId } = getAuthTokensByCookie(document.cookie);
  return userId;
};

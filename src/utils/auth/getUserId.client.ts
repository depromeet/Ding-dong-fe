import { UserIdNotFoundError } from './error';
import { getAuthTokensByCookie } from './tokenHandlers';

export const getUserIdClient = (): number | undefined => {
  try {
    if (typeof document === 'undefined') throw new UserIdNotFoundError();
    const { userId } = getAuthTokensByCookie(document.cookie);
    if (userId !== undefined) return userId;
    throw new UserIdNotFoundError(); // 비로그인한 사용자의 경우
  } catch (e) {
    return undefined;
  }
};

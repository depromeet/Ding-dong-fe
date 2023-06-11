import { AUTH_COOKIE_KEYS, AuthResponseType } from '@/types/auth';

const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;

const generateCookiesKeyValues = (
  authResponse: AuthResponseType,
): [string, AuthResponseType[keyof AuthResponseType]][] => {
  const {
    accessToken,
    refreshToken,
    userId,
    accessTokenExpireDate: accessTokenExpireSecond,
  } = authResponse;
  const accessTokenExpireDate = new Date();
  accessTokenExpireDate.setSeconds(accessTokenExpireDate.getSeconds() + accessTokenExpireSecond);

  return [
    [AUTH_COOKIE_KEYS.accessToken, accessToken],
    [AUTH_COOKIE_KEYS.refreshToken, refreshToken],
    [AUTH_COOKIE_KEYS.userId, userId],
    [AUTH_COOKIE_KEYS.accessTokenExpireDate, accessTokenExpireDate.getTime()],
  ];
};
const getAccessToken = (authTokens: Partial<AuthResponseType>): string | null => {
  const { accessToken, refreshToken, accessTokenExpireDate } = authTokens;
  const isAccessTokenExpired =
    (accessTokenExpireDate ?? 0) - new Date().getTime() < ACCESS_TOKEN_EXPIRE_MARGIN_SECOND;

  if (accessToken && !isAccessTokenExpired) {
    return accessToken;
  } else if (refreshToken) {
    // token refresh 로직 처리
    return null;
  } else {
    return null;
  }
};

const getAuthTokensByCookie = (cookieString: string): Partial<AuthResponseType> => {
  const auth: Partial<AuthResponseType> = {};
  for (const cookie of cookieString.split('; ')) {
    const [key, value] = cookie.split('=');
    if (key === AUTH_COOKIE_KEYS.accessToken) {
      auth.accessToken = value;
    }
    if (key === AUTH_COOKIE_KEYS.refreshToken) {
      auth.refreshToken = value;
    }
    if (key === AUTH_COOKIE_KEYS.userId) {
      auth.userId = Number(value);
    }
    if (key === AUTH_COOKIE_KEYS.accessTokenExpireDate) {
      auth.accessTokenExpireDate = Number(value);
    }
  }
  return auth;
};

export { generateCookiesKeyValues, getAccessToken, getAuthTokensByCookie };

import { AUTH_COOKIE_KEYS, AuthResponse } from '~/types/auth';

type AuthCookies = [string, AuthResponse[keyof AuthResponse]][];
export type ValidTokens = {
  accessToken: string;
  authCookies?: AuthCookies;
};

const generateCookiesKeyValues = (authResponse: AuthResponse): AuthCookies => {
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

const getAuthTokensByCookie = (cookieString: string): Partial<AuthResponse> => {
  const auth: Partial<AuthResponse> = {};
  for (const cookie of cookieString.split('; ')) {
    const [key, value] = cookie.split('=');
    if (key === AUTH_COOKIE_KEYS.accessToken) {
      auth.accessToken = value;
    } else if (key === AUTH_COOKIE_KEYS.refreshToken) {
      auth.refreshToken = value;
    } else if (key === AUTH_COOKIE_KEYS.userId) {
      auth.userId = Number(value);
    } else if (key === AUTH_COOKIE_KEYS.accessTokenExpireDate) {
      auth.accessTokenExpireDate = Number(value);
    }
  }
  return auth;
};

const ACCESS_TOKEN_EXPIRE_MARGIN_SECOND = 60;
export { ACCESS_TOKEN_EXPIRE_MARGIN_SECOND, generateCookiesKeyValues, getAuthTokensByCookie };

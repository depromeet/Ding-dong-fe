import { reissue } from '~/api/domain/auth.api.server';
import { AuthResponse } from '~/types/auth';

import {
  ACCESS_TOKEN_EXPIRE_MARGIN_SECOND,
  generateCookiesKeyValues,
  ValidTokens,
} from './tokenHandlers';

export const getAccessTokenServer = async (
  authTokens: Partial<AuthResponse>,
): Promise<ValidTokens | null> => {
  try {
    const { accessToken, refreshToken, accessTokenExpireDate } = authTokens;
    const isAccessTokenExpired =
      (accessTokenExpireDate ?? 0) - new Date().getTime() < ACCESS_TOKEN_EXPIRE_MARGIN_SECOND;

    if (accessToken && !isAccessTokenExpired) {
      return { accessToken };
    } else if (refreshToken) {
      // token refresh 로직 처리
      const authResponse = await reissue(refreshToken);
      return {
        accessToken: authResponse.accessToken,
        authCookies: generateCookiesKeyValues(authResponse),
      };
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};

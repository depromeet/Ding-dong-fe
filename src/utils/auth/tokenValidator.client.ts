import { ApiError } from '~/api/config/customError';
import { reissue } from '~/api/domain/auth.api.client';
import { AuthResponse } from '~/types/auth';

import { generateCookiesKeyValues } from './tokenHandlers';

export const getAccessTokenClient = async (
  authTokens: Partial<AuthResponse>,
): Promise<string | null | ApiError> => {
  try {
    const { refreshToken } = authTokens;
    if (refreshToken) {
      // token refresh 로직 처리
      const { success, ...tokens } = await reissue(refreshToken);
      if (!success) {
        return null;
      }
      for (const [cookieKey, cookieValue] of generateCookiesKeyValues(tokens)) {
        document.cookie = `${cookieKey}=${cookieValue}; path=/;`;
      }

      return tokens.accessToken;
    } else {
      return null;
    }
  } catch (e) {
    return e as ApiError;
  }
};

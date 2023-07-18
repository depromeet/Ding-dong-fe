import { ApiError } from '~/api/config/customError';

export class UserIdNotFoundError extends Error {
  constructor() {
    super('로그인이 필요합니다.');
    this.name = 'UserIdNotFoundError';
  }
}

export const isUnauthorizedError = (error: unknown): boolean => {
  if (error instanceof ApiError) {
    if (error.statusCode === 401) {
      return true;
    }
  }
  // NOTE: redirect가 server side(컴포넌트 외부)에서는 NEXT_REDIRECT 에러를 던지는 것으로 동작합니다. https://github.com/vercel/next.js/issues/42556
  // interceptor.server.ts의 onResponseErrorServer 함수에서 미로그인시 NEXT_REDIRECT 에러를 던지고 있습니다.
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    error['message'] === 'NEXT_REDIRECT'
  ) {
    return true;
  }
  return false;
};

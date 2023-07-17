import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

import { ErrorType } from '~/api/config/api.types';
import { AUTH_ERROR_CODES } from '~/types/errorCodes';
import { getAuthTokensByCookie } from '~/utils/auth/tokenHandlers';
import { getAccessTokenClient } from '~/utils/auth/tokenValidator.client';

import { ApiError } from './customError';
import privateApi from './privateApi';

export const onRequestClient = async (config: InternalAxiosRequestConfig) => {
  try {
    const auth = getAuthTokensByCookie(document.cookie);

    if (auth.accessToken) {
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const onResponseErrorClient = async (
  error: AxiosError<ErrorType, InternalAxiosRequestConfig>,
) => {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  try {
    console.error('error', error);
    if (error.response) {
      // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

      const data = error.response.data;
      const { success, statusCode, errorCode, reason } = data;

      if (error.response.status === 401 || error.response.status === 403) {
        try {
          const auth = getAuthTokensByCookie(document.cookie);
          const validTokenResponse = await getAccessTokenClient(auth);
          if (!validTokenResponse) {
            throw new ApiError(
              success,
              statusCode,
              AUTH_ERROR_CODES.UNAUTHORIZED_ERROR,
              'accessToken 발급중 오류가 발생했습니다.',
            );
          } else if (validTokenResponse instanceof ApiError) {
            throw validTokenResponse;
          } else {
            const prevRequest = error.config;
            if (!prevRequest) {
              throw new ApiError(
                success,
                statusCode,
                AUTH_ERROR_CODES.UNAUTHORIZED_ERROR,
                '이전 요청 정보가 없습니다.',
              );
            }
            prevRequest.headers['Authorization'] = `Bearer ${validTokenResponse}`;
            return privateApi(prevRequest);
          }
        } catch (e) {
          // client-side 로그아웃 처리
          redirect('/auth/signin');
          return Promise.reject(e);
        }
      }

      // 가입한 행성에 초대코드를 들고 다시 진입한 경우
      if (error.response.status === 300) return;

      // 서버에서 보낸 custom 에러 메세지가 없을 경우 기본 메세지를 에러 메세지로 전달
      return Promise.reject(new ApiError(success, statusCode, errorCode, reason));
    }
    if (error.request) {
      // 요청이 이루어 졌으나 응답을 받지 못했습니다.
      // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
      // Node.js의 http.ClientRequest 인스턴스입니다.
      console.log(error.request);
    } else {
      // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
      console.log('Error', error.message);
    }

    return Promise.reject(new Error('요청 도중 에러 발생'));
  } catch (error) {
    return Promise.reject(error);
  }
};

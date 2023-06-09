import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_EXPIRE_MARGIN_SECOND } from '@/middleware';
import { AuthResponseType } from '@/types/auth';

import { ApiError } from './customError';

export const onRequest = (config: InternalAxiosRequestConfig) => {
  try {
    const auth: Partial<AuthResponseType> = {};
    for (const cookie of document.cookie.split('; ')) {
      const [key, value] = cookie.split('=');
      if (key === 'accessToken') {
        auth.accessToken = value;
      }
      if (key === 'refreshToken') {
        auth.refreshToken = value;
      }
      if (key === 'accessTokenExpireDate') {
        auth.accessTokenExpireDate = new Date(value).getTime();
      }
    }
    const { accessToken, refreshToken, accessTokenExpireDate } = auth;
    const isAccessTokenExpired =
      isNaN(accessTokenExpireDate ?? 0) ??
      (accessTokenExpireDate ?? 0) - new Date().getTime() < ACCESS_TOKEN_EXPIRE_MARGIN_SECOND;
    if (accessToken && !isAccessTokenExpired) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    } else if (isAccessTokenExpired) {
      // token refresh 로직 처리
      return config;
    }
    throw new Error('로그인이 필요합니다.');
  } catch (error) {
    return Promise.reject(error);
  }
};

export const onRequestError = (error: AxiosError) => {
  Promise.reject(error);
};

export const onResponse = (response: AxiosResponse) => {
  return response;
};

export const onResponseError = (error: AxiosError) => {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  console.error(error);
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.

    const {
      response: { status },
    } = error;

    // 서버에서 보낸 custom 에러 메세지가 없을 경우 기본 메세지를 에러 메세지로 전달
    return Promise.reject(new ApiError(error.message, status));
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
};

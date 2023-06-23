import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { getAccessToken, getAuthTokensByCookie } from '~/utils/auth/tokenHandlers';

import { ApiError } from './customError';

export const onRequest = async (config: InternalAxiosRequestConfig) => {
  try {
    const auth = getAuthTokensByCookie(document.cookie);
    const validAccessToken = await getAccessToken(auth);

    if (validAccessToken) {
      config.headers.Authorization = `Bearer ${validAccessToken}`;
      return config;
    }
    throw new Error('로그인이 필요합니다.');
  } catch (error) {
    // client-side 로그아웃 처리
    return Promise.reject(error);
  }
};

export const onRequestError = (error: AxiosError) => {
  Promise.reject(error);
};

export const onResponse = (response: AxiosResponse) => {
  const data = response.data;
  const { headers, status } = response;
  return { ...data, headers, status };
};

export const onResponseError = (error: AxiosError) => {
  // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
  // 응답 오류가 있는 작업 수행
  console.error('error', error);
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

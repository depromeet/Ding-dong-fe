import axios, { InternalAxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

import { AUTH_COOKIE_KEYS } from '~/types/auth';
import { getAccessToken } from '~/utils/auth/tokenHandlers';

import { CustomInstance } from './api.types';
import { onRequestError, onResponse } from './interceptor';
import { ROOT_API_URL } from './requestUrl';

const onServerRequest = async (config: InternalAxiosRequestConfig) => {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get(AUTH_COOKIE_KEYS.accessToken)?.value;
    const accessTokenExpireDate = Number(
      cookieStore.get(AUTH_COOKIE_KEYS.accessTokenExpireDate)?.value,
    );
    const validAccessToken = await getAccessToken({ accessToken, accessTokenExpireDate });
    if (validAccessToken) {
      config.headers.Authorization = `Bearer ${validAccessToken}`;
      return config;
    }
    throw new Error('로그인이 필요합니다.');
  } catch (error) {
    // server-side 로그아웃 처리
    return Promise.reject(error);
  }
};

export const privateApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApi.defaults.timeout = 2500;

privateApi.interceptors.request.use(onServerRequest, onRequestError);

privateApi.interceptors.response.use(onResponse);

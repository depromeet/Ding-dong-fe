'use client';
import axios, { InternalAxiosRequestConfig } from 'axios';

import { getAccessToken, getAuthTokensByCookie } from '~/utils/auth/tokenHandlers';

import { CustomInstance } from './api.types';
import { onRequestError, onResponse, onResponseError } from './interceptor';
import { ROOT_API_URL } from './requestUrl';

const onClientRequest = async (config: InternalAxiosRequestConfig) => {
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
export const getClientPrivateApi = () => {
  const privateApi: CustomInstance = axios.create({
    baseURL: ROOT_API_URL,
  });

  privateApi.defaults.timeout = 2500;

  privateApi.interceptors.request.use(onClientRequest, onRequestError);

  privateApi.interceptors.response.use(onResponse, onResponseError);
  return privateApi;
};

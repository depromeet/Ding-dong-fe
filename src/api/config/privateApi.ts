'use client';
import axios from 'axios';

import { CustomInstance } from '~/api/config/api.types';

import { onRequest, onRequestError, onResponse, onResponseError } from './interceptor';
import { ROOT_API_URL } from './requestUrl';

const privateApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApi.defaults.timeout = 2500;

privateApi.interceptors.request.use(onRequest, onRequestError);

privateApi.interceptors.response.use(onResponse, onResponseError);

export default privateApi;

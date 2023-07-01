'use client';
import axios from 'axios';

import { CustomInstance } from '~/api/config/api.types';

import { onRequestError, onResponse } from './interceptor';
import { onRequestClient, onResponseErrorClient } from './interceptor.client';
import { ROOT_API_URL } from './requestUrl';

const privateApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApi.defaults.timeout = 2500;

privateApi.interceptors.request.use(onRequestClient, onRequestError);

privateApi.interceptors.response.use(onResponse, onResponseErrorClient);

export default privateApi;

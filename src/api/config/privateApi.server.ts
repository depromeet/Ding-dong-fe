import axios from 'axios';

import { CustomInstance } from './api.types';
import { onResponse } from './interceptor';
import { onRequestServer } from './interceptor.server';
import { ROOT_API_URL } from './requestUrl';

export const privateApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
});

privateApi.defaults.timeout = 2500;

privateApi.interceptors.request.use(onRequestServer);

privateApi.interceptors.response.use(onResponse);

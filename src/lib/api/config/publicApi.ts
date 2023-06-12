import axios from 'axios';

import { CustomInstance } from '~/lib/api/config/api.types';

import { onResponse, onResponseError } from './interceptor';
import { ROOT_API_URL } from './requestUrl';

const publicApi: CustomInstance = axios.create({
  baseURL: ROOT_API_URL,
});

publicApi.defaults.timeout = 2500;

publicApi.interceptors.response.use(onResponse, onResponseError);

export default publicApi;

import { isProd } from '@/utils/util.common';

// TODO: API 배포 후 설정 필요
const DEVELOPMENT_API_URL = 'https://ding-dong-planet.com/api';
const PRODUCTION_API_URL = '/api';

export const ROOT_API_URL = isProd(process.env.NODE_ENV) ? PRODUCTION_API_URL : DEVELOPMENT_API_URL;

export const REQUEST_API = {
  TESTER: '/tester',
};

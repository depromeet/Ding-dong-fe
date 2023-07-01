import { AuthResponse } from '~/types/auth';

import publicApi from '../config/publicApi';

export const reissue = async (refreshToken: string) =>
  publicApi.get<AuthResponse>('/auth/login/reissue', { params: { REFRESH_TOKEN: refreshToken } });

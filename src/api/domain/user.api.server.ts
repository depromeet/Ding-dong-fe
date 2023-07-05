import { privateApi } from '~/api/config/privateApi.server';
import { UserInfoResponse } from '~/types/user';

export const getUserInfoServer = () => privateApi.get<UserInfoResponse>(`/user/profile`);

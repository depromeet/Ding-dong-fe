import { UserInfoResponse } from '~/types/user';

import publicApi from '../config/publicApi';

// TO DO: publicApi 대신 middleware에서 사용할 수 있도록 refreshToken 검증 로직 추가하기
export const getUserInfoServer = () => publicApi.get<UserInfoResponse>(`/user/profile`);

import { useQuery } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { UserInfoResponse } from '~/types/user';

export const userQueryKey = {
  userInfo: () => ['userInfo'],
};

export const getUserInfo = () => privateApi.get<UserInfoResponse>(`/user/profile`);

export const useGetUserInfo = () => useQuery(userQueryKey.userInfo(), () => getUserInfo());

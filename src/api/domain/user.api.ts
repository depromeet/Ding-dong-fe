import { useQuery } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { UserInfoResponse } from '~/types/user';
import { UserIdNotFoundError } from '~/utils/auth/error';

export const userQueryKey = {
  userInfo: () => ['userInfo'],
};

export const getUserInfo = () => privateApi.get<UserInfoResponse>(`/user/profile`);

export const useGetUserInfo = () => useQuery(userQueryKey.userInfo(), () => getUserInfo());

export const useGetUserId = (): number => {
  const { data } = useGetUserInfo();
  const { userId } = data ?? {};
  if (!userId) throw new UserIdNotFoundError();
  return userId;
};

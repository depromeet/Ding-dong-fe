import { useInfiniteQuery } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { NotificationGetRequest, NotificationGetResponse } from '~/types/notification';

export const notificationQueryKey = {
  notifications: (pageParam: number) => ['notifications', pageParam],
};
export const getNotifications = ({ pageParam }: NotificationGetRequest) =>
  privateApi.get<NotificationGetResponse>(`/notifications?page=${pageParam}&size=10`);

export const useGetNotifications = ({ pageParam }: NotificationGetRequest) => {
  return useInfiniteQuery(
    notificationQueryKey.notifications(pageParam),
    ({ pageParam = 0 }) => getNotifications({ pageParam }),
    {
      getNextPageParam: data => (!data.data.hasNext ? data.data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

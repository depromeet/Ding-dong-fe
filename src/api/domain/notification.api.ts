import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import {
  NotificationGetRequest,
  NotificationGetResponse,
  UnreadNotification,
} from '~/types/notification';

export const notificationQueryKey = {
  notifications: (pageParam: number) => ['notifications', pageParam],
  unread: () => ['unread'],
};
export const getNotifications = ({ pageParam }: NotificationGetRequest) =>
  privateApi.get<NotificationGetResponse>(`/notifications?page=${pageParam}&size=10`);

export const useGetNotifications = ({ pageParam }: NotificationGetRequest) => {
  return useInfiniteQuery(
    notificationQueryKey.notifications(pageParam),
    ({ pageParam = 0 }) => getNotifications({ pageParam }),
    {
      getNextPageParam: data => (data.hasNext ? data.page + 1 : undefined),
      refetchOnWindowFocus: true,
    },
  );
};

export const getUnreadNotification = () =>
  privateApi.get<UnreadNotification>(`/notifications/unread`);

export const useGetUnreadNotification = () =>
  useQuery(notificationQueryKey.unread(), () => getUnreadNotification(), {
    retry: false,
  });

export const readNotification = (notificationId: number) =>
  privateApi.put(`/notifications/${notificationId}/read`);

export const useReadNotification = ({ pageParam }: NotificationGetRequest) => {
  const queryClient = useQueryClient();

  return useMutation((notificationId: number) => readNotification(notificationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(notificationQueryKey.notifications(pageParam));
    },
  });
};

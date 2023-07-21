import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { NotificationGetResponse, UnreadNotification } from '~/types/notification';

export const notificationQueryKey = {
  notifications: () => ['notifications'],
  unread: () => ['unread'],
};
export const getNotifications = () => privateApi.get<NotificationGetResponse>(`/notifications`);

export const useGetNotifications = () => {
  return useQuery(notificationQueryKey.notifications(), () => getNotifications());
};

export const getUnreadNotification = () =>
  privateApi.get<UnreadNotification>(`/notifications/unread`);

export const useGetUnreadNotification = () =>
  useQuery(notificationQueryKey.unread(), () => getUnreadNotification(), {
    retry: false,
  });

export const readNotification = (notificationId: number) =>
  privateApi.put(`/notifications/${notificationId}/read`);

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  return useMutation((notificationId: number) => readNotification(notificationId), {
    onSuccess: () => {
      queryClient.invalidateQueries(notificationQueryKey.notifications());
    },
  });
};

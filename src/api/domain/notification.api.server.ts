import { privateApi } from '~/api/config/privateApi.server';
import { NotificationGetResponse } from '~/types/notification';

export const getNotificationsServer = () =>
  privateApi.get<NotificationGetResponse>(`/notifications`);

import { privateApi } from '~/api/config/privateApi.server';
import { NotificationGetRequest, NotificationGetResponse } from '~/types/notification';

export const getNotificationsServer = ({ pageParam }: NotificationGetRequest) =>
  privateApi.get<NotificationGetResponse>(`/notifications?page=${pageParam}&size=10`);

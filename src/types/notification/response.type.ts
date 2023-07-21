import { NotificationModel } from '~/types/notification';

export type NotificationGetResponse = {
  notificationDtos: NotificationModel[];
};

export type UnreadNotification = {
  data: boolean;
};

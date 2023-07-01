import { SliceResponse } from '~/types/api';
import { NotificationModel } from '~/types/notification';

export type NotificationGetResponse = SliceResponse<NotificationModel>;

export type UnreadNotification = {
  data: boolean;
};

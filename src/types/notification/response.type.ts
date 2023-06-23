import { SliceResponse } from '~/types/api';
import { NotificationModel } from '~/types/notification';

export type NotificationGetResponse = {
  data: SliceResponse<NotificationModel>;
};

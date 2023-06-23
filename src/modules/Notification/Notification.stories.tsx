import { Meta } from '@storybook/react';

import { createNotification, createNotificationList } from '~/mocks/notification/notification.mock';

import { NotificationItem } from './NotificationItem.client';
import { NotificationList } from './NotificationList.client';

const meta: Meta<typeof NotificationItem> = {
  title: 'modules/Notification',
  component: NotificationItem,
  args: {},
};

export default meta;

const MOCK_NOTIFICATION = createNotification(123);
export const Item = () => <NotificationItem {...MOCK_NOTIFICATION} />;

const MOCK_NOTIFICATIONS = createNotificationList(10, 1, 10);
export const List = () => <NotificationList notifications={MOCK_NOTIFICATIONS.content} />;

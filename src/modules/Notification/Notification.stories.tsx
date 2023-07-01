import { Meta } from '@storybook/react';

import { createNotification, createNotificationList } from '~/mocks/notification/notification.mock';

import { NotificationItem } from './NotificationItem';
import { NotificationList } from './NotificationList';
import { NotificationNoData } from './NotificationNoData';

const meta: Meta<typeof NotificationItem> = {
  title: 'modules/Notification',
  component: NotificationItem,
  args: {},
};

export default meta;

const MOCK_NOTIFICATION = createNotification(123);
export const Item = () => <NotificationItem {...MOCK_NOTIFICATION} />;

const MOCK_NOTIFICATIONS = createNotificationList(10, 1, 10);
export const List = () => (
  <div className="px-5">
    <NotificationList notifications={MOCK_NOTIFICATIONS.content} />
  </div>
);

export const NoData = () => <NotificationNoData />;

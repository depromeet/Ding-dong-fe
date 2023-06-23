import { NotificationModel } from '~/types/notification';

import { NotificationItem } from './NotificationItem';

type NotificationListProps = {
  notifications: NotificationModel[];
};
export const NotificationList = ({ notifications }: NotificationListProps) => {
  return (
    <ul className="flex flex-col gap-7">
      {notifications.map(notification => (
        <NotificationItem {...notification} key={notification.notificationId} />
      ))}
    </ul>
  );
};

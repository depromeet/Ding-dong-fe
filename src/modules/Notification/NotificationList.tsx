import { NotificationModel } from '~/types/notification';

import { NotificationItem } from './NotificationItem';

type NotificationListProps = {
  notifications: NotificationModel[];
  notificationAgoList?: Record<number, string>;
};
export const NotificationList = ({ notifications, notificationAgoList }: NotificationListProps) => {
  return (
    <ul className="flex flex-col gap-7">
      {notifications.map((notification, i) => (
        <div key={notification.notificationId}>
          {!!notificationAgoList?.[notification.notificationId] && (
            <>
              {i !== 0 && <div className="-ml-5 mb-5 w-screen border-b border-b-gray-200"></div>}
              <h2 className="mb-4 text-h4">{notificationAgoList[notification.notificationId]}</h2>
            </>
          )}
          <NotificationItem {...notification} key={notification.notificationId} />
        </div>
      ))}
    </ul>
  );
};

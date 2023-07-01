import { NotificationModel } from '~/types/notification';
import { checkCreateAtAgo } from '~/utils/time.util';

import { NotificationItem } from './NotificationItem';

type NotificationListProps = {
  notifications: NotificationModel[];
};
export const NotificationList = ({ notifications }: NotificationListProps) => {
  const notificationAgoList = notifications.map(notification =>
    checkCreateAtAgo(notification.createdAt),
  );

  return (
    <ul className="flex flex-col gap-7">
      {notifications.map((notification, i) => (
        <div key={notification.notificationId}>
          {(i === 0 || notificationAgoList[i] !== notificationAgoList[i - 1]) && (
            <>
              {i !== 0 && <div className="-ml-5 w-screen border-b border-b-gray-200"></div>}
              <h2 className="text-h4">{notificationAgoList[i]}</h2>
            </>
          )}
          <NotificationItem {...notification} key={notification.notificationId} />
        </div>
      ))}
    </ul>
  );
};

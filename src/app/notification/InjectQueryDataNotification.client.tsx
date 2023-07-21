'use client';

import { useGetNotifications } from '~/api/domain/notification.api';
import { NotificationList } from '~/modules/Notification/NotificationList';
import { NotificationNoData } from '~/modules/Notification/NotificationNoData';
import { NotificationModel } from '~/types/notification';
import { checkNotificationAgo } from '~/utils/time.util';

export const getNotificationTitleList = (notifications?: NotificationModel[]) => {
  if (!notifications) return {};
  const notificationTitleRecord: Record<number, string> = {};
  notifications.forEach(notification => {
    const title = checkNotificationAgo(notification.createdAt);
    if (Object.values(notificationTitleRecord).includes(title)) return;
    notificationTitleRecord[notification.notificationId] = title;
  });
  return notificationTitleRecord;
};

export const InjectQueryDataNotification = () => {
  const { data } = useGetNotifications();

  const notificationAgoList = getNotificationTitleList(data?.notificationDtos);

  if (!data?.notificationDtos.length) return <NotificationNoData />;

  return (
    <>
      <NotificationList
        notifications={data?.notificationDtos ?? []}
        notificationAgoList={notificationAgoList}
      />
    </>
  );
};

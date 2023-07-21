'use client';

import _ from 'lodash';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetNotifications } from '~/api/domain/notification.api';
import { NotificationList } from '~/modules/Notification/NotificationList';
import { NotificationNoData } from '~/modules/Notification/NotificationNoData';
import { NotificationGetResponse, NotificationModel } from '~/types/notification';
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
  const { data, fetchNextPage } = useGetNotifications();
  // TODO: CommunityIdCards에서 사용하는 로직과 통일하기
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && data?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, data?.pages]);

  const notificationAgoList = getNotificationTitleList(
    _.reduce<NotificationGetResponse, NotificationModel[]>(
      data?.pages,
      (acc, page) => {
        return [...acc, ...page.content];
      },
      [],
    ),
  );

  return (
    <>
      {data?.pages.map(page => (
        <div key={page.page} className="mb-7">
          <NotificationList
            notifications={page.content}
            notificationAgoList={notificationAgoList}
          />
          {page.hasNext && <div ref={ref}></div>}
        </div>
      ))}

      {data?.pages[0].content?.length === 0 && <NotificationNoData />}
    </>
  );
};

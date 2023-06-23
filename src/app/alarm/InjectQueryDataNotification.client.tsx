'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetNotifications } from '~/api/domain/notification.api';
import { NotificationList } from '~/modules/Notification/NotificationList';

export const InjectQueryDataNotification = () => {
  const { data, fetchNextPage } = useGetNotifications({
    pageParam: 1,
  });
  // TODO: CommunityIdCards에서 사용하는 로직과 통일하기
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && data?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, data?.pages]);

  return (
    <>
      {data?.pages.map(page => (
        <NotificationList notifications={page.data.content} key={page.data.page} />
      ))}
      <div ref={ref}></div>
      {!data?.pages && <div>새로운 알림이 없습니다.</div>}
    </>
  );
};

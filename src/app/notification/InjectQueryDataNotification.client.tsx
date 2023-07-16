'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetNotifications } from '~/api/domain/notification.api';
import { NotificationList } from '~/modules/Notification/NotificationList';
import { NotificationNoData } from '~/modules/Notification/NotificationNoData';

export const InjectQueryDataNotification = () => {
  const { data, fetchNextPage } = useGetNotifications({
    pageParam: 0,
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
        <div key={page.page}>
          <NotificationList notifications={page.content} page={page.page} />
          {page.hasNext && <div ref={ref}></div>}
        </div>
      ))}

      {data?.pages[0].content?.length === 0 && <NotificationNoData />}
    </>
  );
};

import { useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { notificationQueryKey, useGetUnreadNotification } from '~/api/domain/notification.api';

export const NewNotificationBadge = () => {
  const hasUnreadNotification = useGetUnreadNotification();

  const queryClient = useQueryClient();
  const pathname = usePathname();

  useEffect(() => {
    const newNotificationSource = new EventSource(`${ROOT_API_URL}/notifications/subscribe`);

    newNotificationSource.addEventListener('sse', () => {
      queryClient.setQueryData(notificationQueryKey.unread(), { data: true });
    });
  }, [queryClient]);

  useEffect(() => {
    if (pathname.includes('/notification')) {
      queryClient.setQueryData(notificationQueryKey.unread(), { data: false });
    }
  }, [pathname, queryClient]);

  if (hasUnreadNotification.data?.data) {
    return (
      <div className="absolute right-2pxr h-2 w-2 rounded-full border bg-blue-500 outline-white" />
    );
  }
  return null;
};

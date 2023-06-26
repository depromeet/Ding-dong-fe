import 'server-only';

import { notificationQueryKey } from '~/api/domain/notification.api';
import { getNotificationsServer } from '~/api/domain/notification.api.server';
import { HydrationProvider } from '~/components/HydrationProvider';

import { InjectQueryDataNotification } from './InjectQueryDataNotification.client';

const NotificationPage = async () => {
  const getNotificationsQuery = async () => {
    const data = await getNotificationsServer({ pageParam: 1 });
    return {
      pages: [data],
    };
  };

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={notificationQueryKey.notifications(1)}
        queryFn={getNotificationsQuery}
      >
        <InjectQueryDataNotification />
      </HydrationProvider>
    </>
  );
};

export default NotificationPage;

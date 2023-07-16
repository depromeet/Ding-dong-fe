import 'server-only';

import { Suspense } from 'react';

import { notificationQueryKey } from '~/api/domain/notification.api';
import { getNotificationsServer } from '~/api/domain/notification.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { HydrationProvider } from '~/components/HydrationProvider';

import { InjectQueryDataNotification } from './InjectQueryDataNotification.client';

const NotificationComponent = () => {
  const getNotificationsQuery = async () => {
    const data = await getNotificationsServer({ pageParam: 0 });
    return {
      pages: [data],
    };
  };

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={notificationQueryKey.notifications()}
        queryFn={getNotificationsQuery}
      >
        <InjectQueryDataNotification />
      </HydrationProvider>
    </>
  );
};

const NotificationPage = () => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <NotificationComponent />
      </Suspense>
    </RetryErrorBoundary>
  );
};

export default NotificationPage;

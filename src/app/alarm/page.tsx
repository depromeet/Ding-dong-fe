import 'server-only';

import { notificationQueryKey } from '~/api/domain/notification.api';
import { getNotificationsServer } from '~/api/domain/notification.api.server';
import getQueryClient from '~/lib/tanstackQuery/getQueryClient';

import { InjectQueryDataNotification } from './InjectQueryDataNotification.client';

const AlarmPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(notificationQueryKey.notifications(1), () =>
    getNotificationsServer({ pageParam: 1 }).then(data => ({ pages: [data] })),
  );
  return <InjectQueryDataNotification />;
};

export default AlarmPage;

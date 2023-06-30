import { useGetUnreadNotification } from '~/api/domain/notification.api';

export const NewNotificationBadge = () => {
  const hasUnreadNotification = useGetUnreadNotification();

  if (hasUnreadNotification.data?.data) {
    return (
      <div className="absolute right-2pxr h-2 w-2 rounded-full border bg-blue-500 outline-white" />
    );
  }
  return null;
};

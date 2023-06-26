import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';

const NotificationLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="px-5">
      <div className="mb-5 py-2">
        <h1 className="text-h1">알림</h1>
      </div>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default NotificationLayout;

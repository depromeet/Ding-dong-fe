import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { TopNavigation } from '~/components/TopNavigation';

const NotificationLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TopNavigation>
        <TopNavigation.Left>
          <div className="py-2">
            <h1 className="text-h1">알림</h1>
          </div>
        </TopNavigation.Left>
      </TopNavigation>
      <div className="mt-5 px-5 pb-[calc(20px+theme(spacing.b-nav))]">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default NotificationLayout;

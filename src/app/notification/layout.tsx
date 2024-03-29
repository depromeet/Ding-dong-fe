import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { TopNavigation } from '~/components/TopNavigation';

export const metadata = {
  title: '알림',
};

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
      <main className="overflow-x-hidden px-5 pb-[calc(20px+theme(spacing.b-nav))] pt-5">
        {children}
      </main>
      <BottomNavigation />
    </>
  );
};

export default NotificationLayout;

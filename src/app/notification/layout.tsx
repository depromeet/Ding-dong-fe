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
        <TopNavigation.Title />
        <TopNavigation.Right>
          <TopNavigation.BackButton backButtonType="cancel" direction="right" />
        </TopNavigation.Right>
      </TopNavigation>
      <div className="mb-10pxr mt-5 px-5 pb-b-nav">{children}</div>
      <BottomNavigation />
    </>
  );
};

export default NotificationLayout;

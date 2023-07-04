import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <h1 className="text-h5 font-semibold text-black">설정</h1>
        </TopNavigation.Title>
        <TopNavigation.Right />
      </TopNavigation>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

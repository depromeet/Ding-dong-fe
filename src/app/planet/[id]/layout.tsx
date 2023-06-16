import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-[44px]">
      <TopNavigation />
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

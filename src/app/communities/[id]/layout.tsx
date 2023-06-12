import { PropsWithChildren } from 'react';

import { BottomNavigation } from '@/components/BottomNavigation';
import TopNavigation from '@/components/TopNavigation/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <TopNavigation />
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

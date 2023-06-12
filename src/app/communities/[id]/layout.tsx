import { PropsWithChildren } from 'react';

import { BottomNavigation } from '@/components/BottomNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-[27px]">
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

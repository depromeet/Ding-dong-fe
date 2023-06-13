import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

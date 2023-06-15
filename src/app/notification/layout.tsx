import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-t-nav">
      <PlanetSelector />
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

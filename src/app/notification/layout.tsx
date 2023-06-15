import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { PlanetNameTopNavigation } from '~/modules/PlanetNameTopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pt-t-nav">
      <PlanetNameTopNavigation />
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

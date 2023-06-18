import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { PlanetSelectorTopNavigation } from '~/modules/PlanetSelectorTopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <PlanetSelectorTopNavigation />
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

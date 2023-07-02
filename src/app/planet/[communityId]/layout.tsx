import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="pb-70pxr">
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
      </TopNavigation>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

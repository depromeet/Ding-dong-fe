'use client';

import { TopNavigation } from '~/components/TopNavigation';

export const PlanetNameTopNavigation = () => {
  return (
    <TopNavigation>
      <TopNavigation.Left>
        <p className="text-h1 text-grey-800" onClick={() => console.log('top nav click')}>
          planet
        </p>
      </TopNavigation.Left>
    </TopNavigation>
  );
};

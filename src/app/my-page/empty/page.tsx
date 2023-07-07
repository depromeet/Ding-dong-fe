import Link from 'next/link';

import { BottomNavigation } from '~/components/BottomNavigation';
import { ThreeDotsVerticalIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { CreateIdCardButton } from '~/modules/CreateIdCardButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';

const EmptyPlanet = () => {
  return (
    <div>
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left></TopNavigation.Left>
        <TopNavigation.Right>
          <Link href="/my-page/config">
            <ThreeDotsVerticalIcon />
          </Link>
        </TopNavigation.Right>
      </TopNavigation>
      <main className="pt-35pxr">
        <div className="mx-layout-l">
          <CreateIdCardButton />
        </div>
        <div className="mx-layout-sm mt-28pxr">
          <PlanetCreationButton />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default EmptyPlanet;

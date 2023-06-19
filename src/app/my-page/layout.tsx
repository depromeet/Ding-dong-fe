'use client';
import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { GearFillIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const onClickGearFill = () => {
    router.push('/my-page/config');
  };
  return (
    <div>
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        <TopNavigation.Title></TopNavigation.Title>
        <TopNavigation.Right>
          <GearFillIcon onClick={onClickGearFill} />
        </TopNavigation.Right>
      </TopNavigation>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

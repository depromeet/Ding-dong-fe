'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { GearIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

const Layout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  return (
    <div className="pb-70pxr">
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        <TopNavigation.Title></TopNavigation.Title>
        <TopNavigation.Right>
          <Link href={`/admin/${pathname}`}>
            <GearIcon />
          </Link>
        </TopNavigation.Right>
      </TopNavigation>
      {children}
      <BottomNavigation />
    </div>
  );
};

export default Layout;

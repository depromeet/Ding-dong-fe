'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { BottomNavigation } from '~/components/BottomNavigation';
import { GearFillIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  const router = useRouter();

  const onClickGearFill = () => {
    router.push('/my-page/config');
  };

  return (
    <div>
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left>커뮤니티 이동 컴포넌트</TopNavigation.Left>
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

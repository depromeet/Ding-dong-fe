'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

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
        <TopNavigation.Left />
        <TopNavigation.Title />
        <TopNavigation.Right>
          <GearFillIcon onClick={onClickGearFill} className="fill-gray-700" />
        </TopNavigation.Right>
      </TopNavigation>
      {children}
    </div>
  );
};

export default Layout;

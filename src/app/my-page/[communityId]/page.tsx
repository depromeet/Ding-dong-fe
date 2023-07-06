import Link from 'next/link';

import { MyPageIdCard } from '~/app/my-page/[communityId]/components/MyPageIdCard';
import { BottomNavigation } from '~/components/BottomNavigation';
import { GearFillIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { IdCardEditButton } from '~/modules/IdCardEditButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';
import { PlanetSelector } from '~/modules/PlanetSelector';

type MyPageProps = {
  params: {
    communityId: number;
  };
};

const MyPage = ({ params: { communityId } }: MyPageProps) => {
  return (
    <div>
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        <TopNavigation.Right>
          <Link href="/my-page/config">
            <GearFillIcon />
          </Link>
        </TopNavigation.Right>
      </TopNavigation>
      <main className="pt-35pxr">
        <div className="mx-layout-l">
          <div className="mb-16pxr flex w-full justify-between">
            <h2 className="text-h3 text-grey-800">내 주민증</h2>
            <IdCardEditButton />
          </div>
          <MyPageIdCard id={communityId} />
        </div>
        <div className="mx-layout-sm mt-28pxr">
          <PlanetCreationButton />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MyPage;

import 'server-only';

import Link from 'next/link';

import { checkIdCardServer } from '~/api/domain/community.api.server';
import { MyPageIdCard } from '~/app/my-page/[communityId]/components/MyPageIdCard';
import { BottomNavigation } from '~/components/BottomNavigation';
import { ThreeDotsVerticalIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { CreateIdCardButton } from '~/modules/CreateIdCardButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';
import { PlanetSelector } from '~/modules/PlanetSelector';

type MyPageProps = {
  params: {
    communityId: number;
  };
};

const MyPage = async ({ params: { communityId } }: MyPageProps) => {
  const { userMakeIdCard } = await checkIdCardServer(communityId);
  const isUserMakeIdCard = userMakeIdCard;

  return (
    <div>
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        <TopNavigation.Right>
          <Link href={`/my-page/config?communityId=${communityId}`}>
            <ThreeDotsVerticalIcon />
          </Link>
        </TopNavigation.Right>
      </TopNavigation>
      <main className="pt-35pxr">
        <div className="mx-layout-l">
          {isUserMakeIdCard ? <MyPageIdCard communityId={communityId} /> : <CreateIdCardButton />}
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

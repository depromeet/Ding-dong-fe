import 'server-only';

import { getCommunityList } from '~/api/domain/community.api';
import { Divider } from '~/components/Divider';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetMenu } from '~/modules/PlanetMenu';
import { UserMenu } from '~/modules/UserMenu';

export const dynamic = 'force-dynamic';

const MyPageConfig = async () => {
  // TODO: userId 수정 필요
  const userId = 1;

  const { communityListDtos } = await getCommunityList(userId);

  const isBelongToCommunity = communityListDtos.length !== 0;

  return (
    <main>
      <TopNavigation>
        <TopNavigation.Left>
          <TopNavigation.BackButton />
        </TopNavigation.Left>
        <TopNavigation.Title>
          <h1 className="text-h5 font-semibold text-black">설정</h1>
        </TopNavigation.Title>
      </TopNavigation>
      <div className="pt-28pxr">
        {isBelongToCommunity && (
          <>
            <PlanetMenu />
            <Divider />
          </>
        )}
        <UserMenu />
      </div>
    </main>
  );
};

export default MyPageConfig;

import 'server-only';

import { getCommunityListServer } from '~/api/domain/community.api.server';
import { getUserInfoServer } from '~/api/domain/user.api.server';
import { Divider } from '~/components/Divider';
import { PlanetMenu } from '~/modules/PlanetMenu';
import { UserMenu } from '~/modules/UserMenu';

export const dynamic = 'force-dynamic';

const MyPageConfig = async () => {
  const { userProfileDto } = await getUserInfoServer();

  const { communityListDtos } = await getCommunityListServer(userProfileDto.userId);

  const isBelongToCommunity = communityListDtos.length !== 0;

  return (
    <main>
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

import 'server-only';

import { getCommunityListServer } from '~/api/domain/community.api.server';
import { getUserInfoServer } from '~/api/domain/user.api.server';
import { Divider } from '~/components/Divider';
import { PlanetMenu } from '~/modules/PlanetMenu';
import { UserMenu } from '~/modules/UserMenu';
import { DINGDONG_PLANET } from '~/utils/variable';

export const dynamic = 'force-dynamic';

type MyPageConfigProps = {
  params: {
    communityId?: string;
  };
};

const MyPageConfig = async ({ params: { communityId } }: MyPageConfigProps) => {
  const isDingDongPlanet = Number(communityId) === DINGDONG_PLANET.DINGDONG_PLANET_ID;
  const { userProfileDto } = await getUserInfoServer();

  const { communityListDtos } = await getCommunityListServer(userProfileDto.userId);

  const isBelongToCommunity = communityListDtos.length !== 0;

  return (
    <main>
      <div className="pt-28pxr">
        {isBelongToCommunity && communityId && !isDingDongPlanet && (
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

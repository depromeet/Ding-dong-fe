import 'server-only';

import Link from 'next/link';

import { communityQueryKey } from '~/api/domain/community.api';
import { getCommunityIdCardsServer } from '~/api/domain/community.api.server';
import { CommunityDetail } from '~/app/planet/[communityId]/components/CommunityDetail';
import { CommunityIdCards } from '~/app/planet/[communityId]/components/CommunityIdCards';
import { IdCardCreatorButton } from '~/app/planet/[communityId]/components/IdCardCreatorButton';
import { BottomNavigation } from '~/components/BottomNavigation';
import { HydrationProvider } from '~/components/HydrationProvider';
import { GearIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

type PlanetPageProps = {
  params: {
    communityId: string;
  };
};

const PlanetPage = async ({ params: { communityId: communityIdParam } }: PlanetPageProps) => {
  const communityId = Number(communityIdParam);

  const isMyPlanet = true; // TODO 관리자인지 여부 API 필요

  const getCommunityIdCardsQuery = async () => {
    const data = await getCommunityIdCardsServer({ communityId });
    return {
      pages: [data],
    };
  };

  return (
    <main className="mb-60pxr">
      <TopNavigation>
        <TopNavigation.Left>
          <PlanetSelector />
        </TopNavigation.Left>
        {isMyPlanet && (
          <TopNavigation.Right>
            <Link href={`/admin/planet/${communityId}`}>
              <GearIcon />
            </Link>
          </TopNavigation.Right>
        )}
      </TopNavigation>
      <CommunityDetail id={communityId} />
      <IdCardCreatorButton communityId={communityId} />
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={communityQueryKey.idCards(communityId)}
        queryFn={getCommunityIdCardsQuery}
      >
        <CommunityIdCards communityId={communityId} />
      </HydrationProvider>
      <BottomNavigation />
    </main>
  );
};

export default PlanetPage;

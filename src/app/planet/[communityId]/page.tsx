import 'server-only';

import { communityQueryKey } from '~/api/domain/community.api';
import { getCommunityIdCardsServer } from '~/api/domain/community.api.server';
import { CommunityDetail } from '~/app/planet/[communityId]/components/CommunityDetail';
import { CommunityIdCards } from '~/app/planet/[communityId]/components/CommunityIdCards';
import { IdCardCreatorButton } from '~/app/planet/[communityId]/components/IdCardCreatorButton';
import { BottomNavigation } from '~/components/BottomNavigation';
import { HydrationProvider } from '~/components/HydrationProvider';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetSelector } from '~/modules/PlanetSelector';

type PlanetPageProps = {
  params: {
    communityId: string;
  };
};

const PlanetPage = async ({ params: { communityId: communityIdParam } }: PlanetPageProps) => {
  const communityId = Number(communityIdParam);

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

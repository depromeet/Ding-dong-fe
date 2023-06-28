import 'server-only';

import { communityQueryKey } from '~/api/domain/community.api';
import { getCommunityIdCardsServer } from '~/api/domain/community.api.server';
import { CommunityDetail } from '~/app/planet/[id]/components/CommunityDetail';
import { CommunityIdCards } from '~/app/planet/[id]/components/CommunityIdCards';
import { HydrationProvider } from '~/components/HydrationProvider';

type PlanetPageProps = {
  params: {
    id: string;
  };
};

const PlanetPage = async ({ params: { id } }: PlanetPageProps) => {
  const communityId = Number(id);

  const getCommunityIdCardsQuery = async () => {
    const data = await getCommunityIdCardsServer({ communityId });
    return {
      pages: [data],
    };
  };

  return (
    <div>
      <CommunityDetail id={communityId} />
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={communityQueryKey.idCards(communityId)}
        queryFn={getCommunityIdCardsQuery}
      >
        <CommunityIdCards communityId={communityId} />
      </HydrationProvider>
    </div>
  );
};

export default PlanetPage;

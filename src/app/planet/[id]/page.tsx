import 'server-only';

import { communityQueryKey } from '~/api/domain/community.api';
import {
  getCommunityDetailServer,
  getCommunityIdCardsServer,
} from '~/api/domain/community.api.server';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommunityDetail } from '~/modules/CommunityDetail';
import { CommunityIdCards } from '~/modules/CommunityIdCards';

type PlanetPageProps = {
  params: {
    id: string;
  };
};

const PlanetPage = async ({ params: { id } }: PlanetPageProps) => {
  const communityId = Number(id);
  const { communityDetailsDto } = await getCommunityDetailServer(communityId);

  const getCommunityIdCardsQuery = async () => {
    const data = await getCommunityIdCardsServer({ communityId });
    return {
      pages: [data],
    };
  };

  return (
    <div>
      <CommunityDetail {...communityDetailsDto} />
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

import 'server-only';

import { dehydrate, Hydrate } from '@tanstack/react-query';

import {
  communityQueryKey,
  getCommunityDetail,
  getCommunityIdCards,
} from '~/api/domain/community.api';
import getQueryClient from '~/lib/tanstackQuery/getQueryClient';
import { CommunityDetail } from '~/modules/CommunityDetail';
import { CommunityIdCards } from '~/modules/CommunityIdCards';

type PlanetPageProps = {
  params: {
    id: string;
  };
};

const PlanetPage = async ({ params: { id } }: PlanetPageProps) => {
  const communityId = parseInt(id);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(communityQueryKey.idCards(communityId), () => {
    return getCommunityIdCards({ communityId }).then(data => {
      return {
        pages: [data],
      };
    });
  });
  const dehydratedState = dehydrate(queryClient);

  const { communityDetailsDto } = await getCommunityDetail(communityId);

  return (
    <Hydrate state={dehydratedState}>
      <div>
        <CommunityDetail {...communityDetailsDto} />
        <CommunityIdCards communityId={communityId} />
      </div>
    </Hydrate>
  );
};

export default PlanetPage;

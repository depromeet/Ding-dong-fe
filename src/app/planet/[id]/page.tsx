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
  const queryClient = getQueryClient();
  const pageParam = 1;
  await queryClient.prefetchQuery(communityQueryKey.idCards(id, pageParam), () => {
    return getCommunityIdCards({ communityId: id, pageParam }).then(data => {
      return {
        pages: [data],
      };
    });
  });
  const dehydratedState = dehydrate(queryClient);

  const { communityDetailsDto } = await getCommunityDetail(id);

  return (
    <Hydrate state={dehydratedState}>
      <div>
        <CommunityDetail {...communityDetailsDto} />
        <CommunityIdCards communityId={id} />
      </div>
    </Hydrate>
  );
};

export default PlanetPage;

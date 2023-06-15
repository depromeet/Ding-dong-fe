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

const PlanetPage = async () => {
  const queryClient = getQueryClient();
  // TODO: 커뮤니티 id 값 수정해야함
  const communityId = '1';
  const pageParam = 1;
  await queryClient.prefetchQuery(communityQueryKey.idCards(communityId, pageParam), () => {
    return getCommunityIdCards({ communityId, pageParam }).then(data => {
      return {
        pages: [data],
      };
    });
  });
  const dehydratedState = dehydrate(queryClient);

  // TODO: 커뮤니티 id 값 수정해야함
  const { communityDetailsDto } = await getCommunityDetail(communityId);

  return (
    <Hydrate state={dehydratedState}>
      <div>
        <CommunityDetail {...communityDetailsDto} />
        <CommunityIdCards />
      </div>
    </Hydrate>
  );
};

export default PlanetPage;

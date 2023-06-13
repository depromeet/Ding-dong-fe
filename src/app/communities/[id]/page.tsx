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

const page = async () => {
  const queryClient = getQueryClient();
  // TODO: 커뮤니티 id 값 수정해야함
  const id = '1';
  const pageParam = 1;
  await queryClient.prefetchQuery(communityQueryKey.idCards(id, pageParam), () => {
    return getCommunityIdCards({ id, pageParam }).then(data => {
      return {
        pages: [data],
      };
    });
  });
  const dehydratedState = dehydrate(queryClient);

  // TODO: 커뮤니티 id 값 수정해야함
  const { communityDetailsDto } = await getCommunityDetail(id);

  return (
    <Hydrate state={dehydratedState}>
      <div>
        <CommunityDetail {...communityDetailsDto} />
        <CommunityIdCards />
      </div>
    </Hydrate>
  );
};

export default page;

import 'server-only';

import { dehydrate, Hydrate } from '@tanstack/react-query';

import {
  COMMUNITY_KEYS,
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
  await queryClient.prefetchQuery([COMMUNITY_KEYS.COMMUNITY_ID_CARDS, { id, pageParam }], () => {
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
        <h3 className="mb-16pxr text-h3 text-grey-800">우리 행성 주민을 소개할게요!</h3>
        <CommunityIdCards />
      </div>
    </Hydrate>
  );
};

export default page;

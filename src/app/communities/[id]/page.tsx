import 'server-only';

import { dehydrate, Hydrate } from '@tanstack/react-query';

import communityApi from '~/api/domain/community.api';
import { community } from '~/hooks/api/queryKey.type';
import getQueryClient from '~/lib/tanstackQuery/getQueryClient';
import { CommunityDetail } from '~/modules/CommunityDetail';
import { CommunityIdCards } from '~/modules/CommunityIdCards';

const page = async () => {
  const queryClient = getQueryClient();
  // TODO: 커뮤니티 id 값 수정해야함
  await queryClient.prefetchQuery(community.idCards('1', 1), () => {
    return communityApi.getCommunityIdCards('1', 1).then(data => {
      return {
        pages: [data],
      };
    });
  });
  const dehydratedState = dehydrate(queryClient);

  // TODO: 커뮤니티 id 값 수정해야함
  const { communityDetailsDto } = await communityApi.getCommunityDetail('1');

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

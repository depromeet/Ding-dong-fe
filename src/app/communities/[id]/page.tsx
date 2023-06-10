import 'server-only';

import communityApi from '@/lib/api/domain/community.api';
import { CommunitySummary } from '@/modules/CommunitySummary';

const CommunitiyPage = async () => {
  // TODO: 로그인 부분 완료되면 userId 받아오기
  const userId = '1';
  const { data } = await communityApi.getUserCommunityList(userId);
  const communityList = data.communityListDtos;

  return (
    <div className="">
      <CommunitySummary {...communityList[0]} />
    </div>
  );
};

export default CommunitiyPage;

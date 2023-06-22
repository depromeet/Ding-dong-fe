import 'server-only';

import { getCommunityIdCardServer } from '~/api/domain/community.api.server';

import CallApiTest from './callApiTest';

const AccountHome = async () => {
  const communities = await getCommunityIdCardServer(1);
  console.log(communities);
  return (
    <div>
      로그인이 필요한 페이지 테스트
      <CallApiTest />
    </div>
  );
};

export default AccountHome;

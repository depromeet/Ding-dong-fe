import 'server-only';

import { PrivateFetch } from '~/api/config/privateFetch';

import CallApiTest from './callApiTest';

const AccountHome = async () => {
  const communities = await PrivateFetch.get(`/communities/1/idCards`);

  console.log(communities.data);
  return (
    <div>
      로그인이 필요한 페이지 테스트
      <CallApiTest />
    </div>
  );
};

export default AccountHome;

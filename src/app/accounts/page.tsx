import 'server-only';

import { ROOT_API_URL } from '@/lib/api/config/requestUrl';

import CallApiTest from './callApiTest';

const AccountHome = async () => {
  const communities = await fetch(`${ROOT_API_URL}/communities/1/idCards`);

  console.log('response is ok?', communities.ok);
  return (
    <div>
      로그인이 필요한 페이지 테스트
      <CallApiTest />
    </div>
  );
};

export default AccountHome;

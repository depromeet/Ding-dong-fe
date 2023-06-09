import { cookies } from 'next/headers';

import { ROOT_API_URL } from '@/lib/api/config/requestUrl';

const AccountHome = async () => {
  const cookieStore = cookies();
  const userId = cookieStore.get('userId');
  const communities = await fetch(`${ROOT_API_URL}/communities/users/${userId}`);

  console.log('response is ok?', communities.ok);
  return <div>로그인이 필요한 페이지 테스트</div>;
};

export default AccountHome;

'use client';

import { useQuery } from '@tanstack/react-query';

import { getCommunityIdCard } from '~/api/domain/community.api';

const CallApiTest = () => {
  const data = useQuery(['communityIdCard'], () => getCommunityIdCard(1), {
    retry: 0,
  });
  console.log(data.data);
  return <div>client fetch test</div>;
};
export default CallApiTest;

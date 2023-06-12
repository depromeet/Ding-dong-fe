'use client';

import { useQuery } from '@tanstack/react-query';

import privateApi from '~/lib/api/config/privateApi';

const getCommunityIdCard = async () => privateApi.get('/communities/1/idCards');
const CallApiTest = () => {
  const data = useQuery(['communityIdCard'], getCommunityIdCard, {
    retry: 0,
  });
  console.log(data);
  return <div>client fetch test</div>;
};
export default CallApiTest;

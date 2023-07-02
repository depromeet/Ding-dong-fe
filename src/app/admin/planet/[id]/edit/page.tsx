'use client';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import { CommunityAdminEdit } from '~/modules/CommunityAdmin/CommunityAdminEdit.client';

type AdminCommunityDetailPageProps = {
  params: {
    id: number;
  };
};

const AdminCommunityDetailPage = ({ params: { id } }: AdminCommunityDetailPageProps) => {
  const { data } = useGetCommunityDetail(id);

  return <>{data?.communityDetailsDto && <CommunityAdminEdit {...data.communityDetailsDto} />}</>;
};

export default AdminCommunityDetailPage;

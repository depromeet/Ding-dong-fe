import 'server-only';

import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import { CommunityAdminEdit } from '~/modules/CommunityAdmin/CommunityAdminEdit.client';

type AdminCommunityEditPageProps = {
  params: {
    id: number;
  };
};

const AdminCommunityEditPage = async ({ params: { id } }: AdminCommunityEditPageProps) => {
  const { communityDetailsDto } = await getCommunityDetailServer(Number(id));

  return <CommunityAdminEdit {...communityDetailsDto} />;
};

export default AdminCommunityEditPage;

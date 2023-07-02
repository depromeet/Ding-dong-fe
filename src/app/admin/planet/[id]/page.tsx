import { getCommunityDetailServer } from '~/api/domain/community.api.server';
import { CommunityAdmin } from '~/modules/CommunityAdmin/CommunityAdmin';

type AdminCommunityDetailPageProps = {
  params: {
    id: string;
  };
};

const AdminCommunityDetailPage = async ({ params: { id } }: AdminCommunityDetailPageProps) => {
  const { communityDetailsDto } = await getCommunityDetailServer(Number(id));
  return <CommunityAdmin {...communityDetailsDto} />;
};

export default AdminCommunityDetailPage;

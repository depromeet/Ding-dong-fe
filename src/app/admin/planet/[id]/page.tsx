import { AdminPlanetDetail } from '~/app/admin/planet/[id]/components/AdminPlanetDetailPage';

type AdminCommunityDetailPageProps = {
  params: {
    id: string;
  };
};

const AdminCommunityDetailPage = ({ params: { id } }: AdminCommunityDetailPageProps) => {
  return <AdminPlanetDetail planetId={Number(id)} />;
};

export default AdminCommunityDetailPage;

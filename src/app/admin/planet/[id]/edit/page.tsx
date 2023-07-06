import { PlanetAdminEdit } from '~/app/admin/planet/[id]/edit/components/PlanetAdminEdit';

type AdminCommunityEditPageProps = {
  params: {
    id: number;
  };
};

const AdminCommunityEditPage = ({ params: { id } }: AdminCommunityEditPageProps) => {
  return <PlanetAdminEdit planetId={Number(id)} />;
};

export default AdminCommunityEditPage;

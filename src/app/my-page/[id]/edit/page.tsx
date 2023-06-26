import 'server-only';

import { MyPageEditIdCard } from '~/app/my-page/[id]/edit/components/MyPageEditIdCard';

type EditMyPageProps = {
  params: {
    id: number;
  };
};

const EditMyPage = ({ params: { id } }: EditMyPageProps) => {
  return (
    <main>
      <MyPageEditIdCard id={id} />
    </main>
  );
};

export default EditMyPage;

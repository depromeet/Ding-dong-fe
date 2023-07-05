import 'server-only';

import { MyPageEditIdCard } from '~/app/my-page/[communityId]/edit/components/MyPageEditIdCard';

type MyPageEditProps = {
  params: {
    communityId: number;
  };
};

const MyPageEdit = ({ params: { communityId } }: MyPageEditProps) => {
  return (
    <main className="pt-35pxr">
      <MyPageEditIdCard communityId={communityId} />
    </main>
  );
};

export default MyPageEdit;

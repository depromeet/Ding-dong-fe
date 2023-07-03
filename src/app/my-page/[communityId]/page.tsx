import 'server-only';

import { MyPageIdCard } from '~/app/my-page/[communityId]/components/MyPageIdCard';
import { IdCardEditButton } from '~/modules/IdCardEditButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';

type MyPageProps = {
  params: {
    communityId: number;
  };
};

const MyPage = ({ params: { communityId } }: MyPageProps) => {
  return (
    <main className="pt-35pxr">
      <div className="mx-layout-l">
        <div className="mb-16pxr flex w-full justify-between">
          <h2 className="text-h3 text-grey-800">내 주민증</h2>
          <IdCardEditButton />
        </div>
        <MyPageIdCard id={communityId} />
      </div>
      <div className="mx-layout-sm mt-28pxr">
        <PlanetCreationButton />
      </div>
    </main>
  );
};

export default MyPage;

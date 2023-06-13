import 'server-only';

import Image from 'next/image';

import { PlanetEnterButtons } from '~/modules/PlanetEnterButtons';

const CommunitiesPage = () => {
  return (
    <div className="flex h-screen flex-col justify-center px-5">
      <h1 className="mb-4 mt-1 text-h2 text-grey-900">아직 소속된 행성이 없네요!</h1>
      <p className="text-b2 text-grey-700">행성을 만들거나 초대된 행성으로 이동해보세요.</p>
      <Image src="/assets/images/planet.png" alt="planet" width={400} height={400} />
      <PlanetEnterButtons />
    </div>
  );
};

export default CommunitiesPage;

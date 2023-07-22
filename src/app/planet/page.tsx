import Image from 'next/image';
import Link from 'next/link';

import { ThreeDotsVerticalIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { PlanetEnterButton } from '~/modules/PlanetEnterButton';

const PlanetPage = () => {
  return (
    <main className="h-screen">
      <TopNavigation bottomBorderColor="bg-grey-100">
        <TopNavigation.Left />
        <TopNavigation.Title />
        <TopNavigation.Right>
          <Link href="/my-page/config">
            <ThreeDotsVerticalIcon />
          </Link>
        </TopNavigation.Right>
      </TopNavigation>
      <div className="flex flex-col justify-center px-layout-sm pt-26pxr">
        <h1 className="mb-12pxr mt-4pxr text-h2 text-grey-900">아직 소속된 행성이 없네요!</h1>
        <p className="text-b2 text-grey-700">행성을 만들거나 초대된 행성으로 이동해보세요.</p>
        <Image src="/assets/images/planet.png" alt="planet" width={400} height={400} />
        <PlanetEnterButton />
      </div>
    </main>
  );
};

export default PlanetPage;

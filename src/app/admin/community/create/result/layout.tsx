import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <TopNavigation>
        <TopNavigation.Right className="w-screen">
          <button
            type="button"
            form="community-admin-edit-form"
            className="text-h5 font-semibold text-grey-500"
          >
            나중에 할래요
          </button>
        </TopNavigation.Right>
      </TopNavigation>
      <div className="mt-26pxr px-5">
        <h1 className="text-h2">행성 생성 완료</h1>
        <p className="mt-11pxr text-b2 font-normal text-gray-700">
          활기찬 행성을 위해 함께 할 주민이 필요할 거에요!
        </p>
        <div className="relative -ml-5 mt-30pxr h-[100vw] w-screen">
          <Image
            src="/assets/images/planet-create-result-bg.png"
            fill
            className="object-contain"
            alt="planet"
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;

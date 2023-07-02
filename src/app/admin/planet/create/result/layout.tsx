'use client';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { TopNavigation } from '~/components/TopNavigation';

const Layout = ({ children }: PropsWithChildren) => {
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');
  const communityId = isNaN(Number(communityIdParam)) ? -1 : Number(communityIdParam);
  const router = useRouter();
  const onClickLaterButton = () => {
    router.push(`/planet/${communityId}`);
  };
  return (
    <>
      <TopNavigation>
        <TopNavigation.Right className="w-screen">
          <button
            type="button"
            form="community-admin-edit-form"
            className="text-h5 font-semibold text-grey-500"
            onClick={onClickLaterButton}
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
        <div className="relative mt-30pxr">
          <Image
            src="/assets/images/planet-create-result-bg.png"
            width={375}
            height={375}
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

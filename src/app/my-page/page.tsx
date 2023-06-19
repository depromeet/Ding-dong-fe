'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCommunityStore } from '~/stores/community.store';

const MyPage = () => {
  const { communityId } = useCommunityStore();
  const pathname = usePathname();
  const router = useRouter();

  const shouldRenderDefaultCommunity = () => {
    if (communityId) {
      router.push(`${pathname}/${communityId}`);
    } else {
      router.push(`${pathname}/empty`);
    }
  };

  useEffect(() => {
    shouldRenderDefaultCommunity();
  }, [communityId]);

  return (
    <div className="mt-24pxr">
      <h1 className="mb-90pxr text-h2 text-grey-900">{`마이페이지로\n광속으로 이동중...`}</h1>
      <Image
        src="/assets/images/planet-with-shadow.png"
        alt="planet image"
        object-fit="contain"
        object-position="center"
        className="mx-auto my-0"
        width={339}
        height={385}
      />
    </div>
  );
};

export default MyPage;

'use client';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useGetCommunityList } from '~/api/domain/community.api';
import { useCommunityStore } from '~/stores/community.store';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

const MyPage = () => {
  const { communityId, switchCommunity } = useCommunityStore();
  const pathname = usePathname();
  const router = useRouter();

  const userId = getUserIdClient();
  const { data: communityList } = useGetCommunityList(userId ?? -1);

  useEffect(() => {
    if (communityId > 0) {
      router.push(`${pathname}/${communityId}`);
    } else if (communityList) {
      // communityId 저장이 완료된 시점이 명확하지 않아 communityList 호출 로직을 추가했습니다.
      const lastCommunity = communityList?.communityListDtos.slice(-1)[0];

      if (lastCommunity) {
        switchCommunity(lastCommunity.communityId);
        router.push(`${pathname}/${lastCommunity.communityId}`);
      } else {
        router.push(`${pathname}/empty`);
      }
    } else {
      router.push(`${pathname}/empty`);
    }
  }, [communityId, communityList, pathname, router, switchCommunity]);

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

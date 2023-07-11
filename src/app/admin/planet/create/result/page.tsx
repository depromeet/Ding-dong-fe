'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { useGetCommunityList } from '~/api/domain/community.api';
import { TopNavigation } from '~/components/TopNavigation';
import { InvitationButtons } from '~/modules/InvitationButtons/InvitationButtons.client';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

const AdminCommunityCreateResultPage = () => {
  const userId = getUserIdClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');

  const { data: communityList } = useGetCommunityList(userId ?? -1);

  const lastCommunityId = communityList?.communityListDtos.slice(-1)[0].communityId || -1;

  const communityId = communityIdParam ? Number(communityIdParam) : lastCommunityId;

  const onClickLaterButton = () => {
    router.push(`/planet/${communityId}`);
  };
  return (
    <div>
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
      <main className="mt-26pxr px-5">
        <h1 className="text-h2">행성 생성 완료</h1>
        <p className="mt-11pxr text-b2 font-normal text-gray-700">
          활기찬 행성을 위해 함께 할 주민이 필요할 거에요!
        </p>
        <div className="relative mt-30pxr">
          <Image
            src="/assets/images/planet-with-shadow.png"
            width={375}
            height={375}
            className="object-contain"
            alt="planet"
          />
        </div>
        <div className="mt-3pxr">
          <InvitationButtons communityId={communityId} />
        </div>
      </main>
    </div>
  );
};

export default AdminCommunityCreateResultPage;

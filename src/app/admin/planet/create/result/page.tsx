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
      <main className="flex h-[calc(100vh-50px)] flex-col px-5 py-55pxr pt-26pxr">
        <h1 className="text-h2">행성 생성 완료</h1>
        <p className="mt-11pxr text-b2 font-normal text-gray-700">
          활기찬 행성을 위해 함께 할 주민이 필요할 거에요!
        </p>
        <Image
          src="/assets/images/planet-with-shadow.png"
          width={375}
          height={375}
          className="flex-1 object-contain"
          alt="planet"
        />
        <div className="mt-3pxr">
          <InvitationButtons communityId={communityId} />
        </div>
      </main>
    </div>
  );
};

export default AdminCommunityCreateResultPage;

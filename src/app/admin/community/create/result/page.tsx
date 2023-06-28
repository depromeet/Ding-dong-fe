'use client';

import { useSearchParams } from 'next/navigation';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { KakaoIcon } from '~/components/Icon/KakaoIcon';

const AdminCommunityCreateResultPage = () => {
  const searchParams = useSearchParams();
  const communityId = searchParams.get('communityId');
  const { data } = useGetCommunityDetail(Number(communityId) ?? undefined);
  console.log(data);

  return (
    <div className="mt-3pxr flex flex-col gap-16pxr">
      <Button color="primary" size="xLarge">
        초대 링크 복사하기
      </Button>
      <Button
        color="primary"
        size="medium"
        className="flex justify-center gap-4pxr bg-[#F9DF4A] pb-15pxr pt-17pxr text-[#391B1B]"
      >
        <KakaoIcon className="mt-1pxr" />
        카카오톡으로 초대하기
      </Button>
    </div>
  );
};

export default AdminCommunityCreateResultPage;

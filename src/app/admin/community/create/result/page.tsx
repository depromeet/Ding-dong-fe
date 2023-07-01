/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useSearchParams } from 'next/navigation';

import { useGetCommunityDetail } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { CopyInvitation, useConfirmPopup } from '~/components/ConfirmPopup';
import { KakaoIcon } from '~/components/Icon/KakaoIcon';

const AdminCommunityCreateResultPage = () => {
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');
  const communityId = isNaN(Number(communityIdParam)) ? -1 : Number(communityIdParam);
  const { data } = useGetCommunityDetail(communityId);

  const copyInvitationCodeToClipBoard = () => {
    navigator.clipboard.writeText(`/invitation/${data?.communityDetailsDto.invitationCode}`);
  };

  const {
    isOpen: isCopyInvitationOpen,
    openPopup: openCopyInvitationPopup,
    closePopup: closeCopyInvitationPopup,
    confirm: copyInvitation,
  } = useConfirmPopup();

  const {
    isOpen: isKakaoShareOpen,
    openPopup: openKakaoSharePopup,
    closePopup: closeKakaoSharePopup,
    confirm: kakaoShare,
  } = useConfirmPopup();

  const onClickCopyWebLinkButton = async () => {
    const isOk = await openCopyInvitationPopup();
    closeCopyInvitationPopup();
    if (isOk) {
      // router.push();  // TODO: 이후 로직 정해지면 수정할 예정!
      copyInvitationCodeToClipBoard();
    }
    return;
  };

  const onClickKakaoShareButton = async () => {
    const isOk = await openKakaoSharePopup();
    closeKakaoSharePopup();
    if (isOk) {
      // router.push(); // TODO: 이후 로직 정해지면 수정할 예정!
      copyInvitationCodeToClipBoard();
    }
    return;
  };

  return (
    <div className="mt-3pxr flex flex-col gap-16pxr">
      <Button color="primary" size="xLarge" onClick={onClickCopyWebLinkButton}>
        초대 링크 복사하기
      </Button>
      <Button
        color="primary"
        size="medium"
        className="flex justify-center gap-4pxr bg-[#F9DF4A] pb-15pxr pt-17pxr text-[#391B1B]"
      >
        <KakaoIcon className="mt-1pxr" onClick={onClickKakaoShareButton} />
        카카오톡으로 초대하기
      </Button>
      {isCopyInvitationOpen && <CopyInvitation confirm={copyInvitation} />}
      {isKakaoShareOpen && <CopyInvitation confirm={kakaoShare} />}
    </div>
  );
};

export default AdminCommunityCreateResultPage;

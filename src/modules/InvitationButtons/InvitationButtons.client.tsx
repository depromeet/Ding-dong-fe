'use client';

import { ROOT_URL } from '~/api/config/requestUrl';
import { useGetCommunityDetail } from '~/api/domain/community.api';
import { Button } from '~/components/Button';
import { CopyInvitation, useConfirmPopup } from '~/components/ConfirmPopup';
import { KakaoIcon } from '~/components/Icon/KakaoIcon';
import { useToastMessageStore } from '~/stores/toastMessage.store';

type InvitationButtonsProps = {
  communityId: number;
};

export const InvitationButtons = ({ communityId }: InvitationButtonsProps) => {
  const { data } = useGetCommunityDetail(communityId);
  const { infoToast } = useToastMessageStore();

  const copyInvitationCodeToClipBoard = () => {
    navigator.clipboard.writeText(
      `${ROOT_URL}/invitation/${data?.communityDetailsDto.invitationCode}`,
    );
  };

  const {
    isOpen: isKakaoShareOpen,
    openPopup: openKakaoSharePopup,
    closePopup: closeKakaoSharePopup,
    confirm: kakaoShare,
  } = useConfirmPopup();

  const onClickCopyWebLinkButton = async () => {
    copyInvitationCodeToClipBoard();
    infoToast('클립보드에 복사가 완료됐어요!');
  };

  const onClickKakaoShareButton = async () => {
    const isOk = await openKakaoSharePopup();
    closeKakaoSharePopup();
    if (isOk) {
      copyInvitationCodeToClipBoard();
      infoToast('공유하기 기능은 준비 중이에요...😓');
    }
  };

  return (
    <div className="flex flex-col gap-16pxr">
      <Button color="primary" size="xLarge" onClick={onClickCopyWebLinkButton}>
        초대 링크 복사하기
      </Button>
      <Button
        color="primary"
        size="medium"
        className="flex justify-center gap-4pxr bg-[#F9DF4A] pb-15pxr pt-17pxr text-[#391B1B]"
        onClick={onClickKakaoShareButton}
      >
        <KakaoIcon className="mt-1pxr" />
        카카오톡으로 초대하기
      </Button>
      {isKakaoShareOpen && <CopyInvitation confirm={kakaoShare} />}
    </div>
  );
};

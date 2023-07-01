'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

const TITLE = '초대 링크 복사 완료';
const DESC = '초대 링크를 공유해 보세요';

type CopyInvitationProps = {
  confirm: (type: ConfirmType) => void;
};

export const CopyInvitation = ({ confirm }: CopyInvitationProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('OK')} type="button" size="medium" color="primary">
        초대 링크 공유하기
      </Button>
      <TextButton
        onClick={() => confirm('CANCEL')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        닫기
      </TextButton>
    </div>
  );

  return <Popup title={TITLE} description={DESC} buttons={buttons} />;
};

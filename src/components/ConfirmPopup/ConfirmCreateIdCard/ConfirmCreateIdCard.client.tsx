'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

// const TITLE = '주민증이 없으면 댓글을 남길 수 없어요';
const DESC = '주민증이 없으면 댓글을 남길 수 없어요';

type ConfirmCreateIdCardProps = {
  confirm: (type: ConfirmType) => void;
};

export const ConfirmCreateIdCard = ({ confirm }: ConfirmCreateIdCardProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('OK')} type="button" size="medium" color="primary">
        주민증 만들기
      </Button>
      <TextButton
        onClick={() => confirm('CANCEL')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        다음에 만들기
      </TextButton>
    </div>
  );

  return <Popup description={DESC} buttons={buttons} />;
};

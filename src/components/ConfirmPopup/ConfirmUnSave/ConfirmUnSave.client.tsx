'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

const TITLE = '저장되지 않은 변경사항이 있어요';
const DESC = '변경 사항을 취소할까요?';

type ConfirmUnSaveProps = {
  confirm: (type: ConfirmType) => void;
};

export const ConfirmUnSave = ({ confirm }: ConfirmUnSaveProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('CANCEL')} type="button" size="medium" color="primary">
        아니요
      </Button>
      <TextButton
        onClick={() => confirm('OK')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        네, 저장하지 않을래요
      </TextButton>
    </div>
  );

  return <Popup title={TITLE} description={DESC} buttons={buttons} />;
};

'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

type SimpleConfirmPopupProps = {
  confirm: (type: ConfirmType) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
};

export const SimpleConfirmPopup = ({
  confirm,
  title,
  description,
  confirmText,
  cancelText,
}: SimpleConfirmPopupProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('OK')} type="button" size="medium" color="primary">
        {confirmText}
      </Button>
      <TextButton
        onClick={() => confirm('CANCEL')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        {cancelText}
      </TextButton>
    </div>
  );

  return <Popup title={title} description={description} buttons={buttons} />;
};

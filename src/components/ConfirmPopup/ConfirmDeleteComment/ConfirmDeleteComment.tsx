'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

const TITLE = '댓글 삭제';
const DESC = '댓글을 삭제할까요?';

type ConfirmDeleteCommentProps = {
  confirm: (type: ConfirmType) => void;
};

export const ConfirmDeleteComment = ({ confirm }: ConfirmDeleteCommentProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('OK')} type="button" size="medium" color="primary">
        삭제
      </Button>
      <TextButton
        onClick={() => confirm('CANCEL')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        취소
      </TextButton>
    </div>
  );

  return <Popup title={TITLE} description={DESC} buttons={buttons} />;
};

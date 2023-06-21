'use client';
import { Button } from '~/components/Button';
import { TextButton } from '~/components/Button';
import { ConfirmType } from '~/components/ConfirmPopup/useConfirmPopup';
import Popup from '~/components/Popup/Popup';

const TITLE = '키워드를 삭제하시겠어요?';
const DESC = '키워드 세부 내용까지 없어져요';

type ConfirmDeleteKeywordProps = {
  confirm: (type: ConfirmType) => void;
};

export const ConfirmDeleteKeyword = ({ confirm }: ConfirmDeleteKeywordProps) => {
  const buttons = (
    <div className="flex w-full flex-col">
      <Button onClick={() => confirm('CANCEL')} type="button" size="medium" color="primary">
        취소
      </Button>
      <TextButton
        onClick={() => confirm('OK')}
        type="button"
        className="rounded-xl pt-13pxr text-b3 text-grey-900"
      >
        삭제하기
      </TextButton>
    </div>
  );

  return <Popup title={TITLE} description={DESC} buttons={buttons} />;
};

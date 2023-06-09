import { SimpleConfirmPopup, useConfirmPopup } from '~/components/ConfirmPopup';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ReportButton = () => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();
  const { infoToast } = useToastMessageStore();
  const handleReport = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      infoToast('신고가 접수됐습니다');
    }
  };

  return (
    <>
      <button className="text-detail font-medium text-grey-400 " onClick={() => handleReport()}>
        신고
      </button>
      {isOpen && (
        <SimpleConfirmPopup
          confirm={confirm}
          title="댓글 신고"
          description="댓글을 신고할까요?"
          confirmText="신고"
          cancelText="취소"
        />
      )}
    </>
  );
};

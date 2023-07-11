import { SimpleConfirmPopup, useConfirmPopup } from '~/components/ConfirmPopup';
import { useToastMessageStore } from '~/stores/toastMessage.store';

export const ReportButton = () => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();
  const { infoToast } = useToastMessageStore();
  const handleReport = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      infoToast('정상적으로 신고됐어요!');
    }
  };

  return (
    <>
      <button className="text-detail text-grey-400" onClick={() => handleReport()}>
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

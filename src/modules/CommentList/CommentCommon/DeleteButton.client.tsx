import { SimpleConfirmPopup, useConfirmPopup } from '~/components/ConfirmPopup';

type DeleteButtonProps = {
  onClickToDeleteComment: () => void;
};

export const DeleteButton = ({ onClickToDeleteComment }: DeleteButtonProps) => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();

  const deleteComment = () => {
    onClickToDeleteComment();
  };

  const onDeleteComment = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      deleteComment();
    }
  };

  return (
    <>
      <button className="text-detail font-medium text-grey-400" onClick={() => onDeleteComment()}>
        삭제
      </button>
      {isOpen && (
        <SimpleConfirmPopup
          confirm={confirm}
          title="댓글 삭제"
          description="댓글을 삭제할까요?"
          confirmText="삭제"
          cancelText="취소"
        />
      )}
    </>
  );
};

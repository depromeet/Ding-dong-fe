import { useConfirmPopup } from '~/components/ConfirmPopup';
import { CommentDeletePopup } from '~/components/ConfirmPopup/CommentDeletePopup';

export const DeleteCommentButton = () => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();

  const deleteComment = () => {
    console.log('deleteComment');
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
      <button className="text-detail text-grey-500" onClick={() => onDeleteComment()}>
        삭제
      </button>
      {isOpen && <CommentDeletePopup confirm={confirm} />}
    </>
  );
};

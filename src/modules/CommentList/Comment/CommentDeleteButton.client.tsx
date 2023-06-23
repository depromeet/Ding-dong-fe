import { useDeleteComment } from '~/api/domain/comment.api';
import { useConfirmPopup } from '~/components/ConfirmPopup';
import { CommentDeletePopup } from '~/components/ConfirmPopup/CommentDeletePopup';
import { CommentDeleteRequest } from '~/types/comment';

type CommentDeleteButtonProps = CommentDeleteRequest;

export const CommentDeleteButton = ({ idCardsId, commentId }: CommentDeleteButtonProps) => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();
  const { mutate: mutateDeleteComment } = useDeleteComment(idCardsId);

  const deleteComment = () => {
    mutateDeleteComment({ idCardsId, commentId });
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

import { useDeleteReply } from '~/api/domain/comment.api';
import { useConfirmPopup } from '~/components/ConfirmPopup';
import { CommentDeletePopup } from '~/components/ConfirmPopup/CommentDeletePopup';
import { CommentReplyDeleteRequest } from '~/types/comment';

type CommentReplyDeleteButtonProps = CommentReplyDeleteRequest;

export const CommentReplyDeleteButton = ({
  idCardsId,
  commentId,
  commentReplyId,
}: CommentReplyDeleteButtonProps) => {
  const { isOpen, openPopup, closePopup, confirm } = useConfirmPopup();
  const { mutate: mutateDeleteReply } = useDeleteReply(idCardsId);

  const deleteComment = () => {
    mutateDeleteReply({ idCardsId, commentId, commentReplyId });
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

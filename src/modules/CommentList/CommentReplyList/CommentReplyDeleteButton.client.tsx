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

  // TODO: 내가 작성한 글만 삭제버튼 보여주기
  const deleteReply = () => {
    mutateDeleteReply({ idCardsId, commentId, commentReplyId });
  };

  const onDeleteComment = async () => {
    const isOk = await openPopup();
    closePopup();
    if (isOk) {
      deleteReply();
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

import { useReplyRecipientStore } from '~/stores/comment.store';

type ReplySubmitButtonProps = {
  nickname: string;
  commentId: number;
};

export const ReplySubmitButton = ({ nickname, commentId }: ReplySubmitButtonProps) => {
  const { setReplyRecipient } = useReplyRecipientStore();
  return (
    <button
      className="text-detail font-medium text-grey-500"
      onClick={() => setReplyRecipient(nickname, commentId)}
    >
      답글 달기
    </button>
  );
};

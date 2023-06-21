/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentModel } from '~/types/comment';

type CommentProps = CommentModel;

export const Comment = ({
  commentId,
  content,
  createdAt,
  commentReplyLikeInfo,
  commentReplyInfos,
}: CommentProps) => {
  return (
    <div>
      <h2>comment element</h2>
      <p>{content}</p>
    </div>
  );
};

import { CommentReply } from '~/modules/CommentList/CommentReplyList/CommentReply.client';
import { CommentModel } from '~/types/comment';

type CommentReplyListProps = Pick<CommentModel, 'commentReplyInfos'> & {
  isShowReplyList: boolean;
  idCardsId: number;
  commentId: number;
};
export const CommentReplyList = ({
  idCardsId,
  commentId,
  commentReplyInfos,
  isShowReplyList,
}: CommentReplyListProps) => {
  return (
    <>
      {isShowReplyList && (
        <ul className="mt-24pxr flex flex-col gap-24pxr">
          {commentReplyInfos.map(commentReply => (
            <CommentReply
              idCardsId={idCardsId}
              commentId={commentId}
              key={commentReply.commentReplyId}
              {...commentReply}
            />
          ))}
        </ul>
      )}
    </>
  );
};

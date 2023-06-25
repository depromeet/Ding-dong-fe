import { CommentReply } from '~/modules/CommentList/CommentReplyList/CommentReply.client';
import { CommentModel } from '~/types/comment';

type CommentReplyListProps = Pick<CommentModel, 'commentId'> &
  Pick<CommentModel, 'commentReplyInfos'> & {
    idCardsId: number;
    isShowReplyList: boolean;
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

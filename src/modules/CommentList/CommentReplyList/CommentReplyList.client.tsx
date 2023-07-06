import { CommentReply } from '~/modules/CommentList/CommentReplyList/CommentReply.client';
import { CommentModel } from '~/types/comment';

type CommentReplyListProps = Pick<
  CommentModel,
  'commentReplyInfos' | 'idCardId' | 'commentId' | 'writerInfo'
> & {
  isShowReplyList: boolean;
};
export const CommentReplyList = ({
  idCardId,
  commentId,
  commentReplyInfos,
  isShowReplyList,
  writerInfo,
}: CommentReplyListProps) => {
  return (
    <>
      {isShowReplyList && (
        <ul className="mt-24pxr flex flex-col gap-24pxr">
          {commentReplyInfos.map(commentReply => (
            <CommentReply
              key={commentReply.commentReplyId}
              idCardId={idCardId}
              commentId={commentId}
              writerInfo={writerInfo}
              {...commentReply}
            />
          ))}
        </ul>
      )}
    </>
  );
};

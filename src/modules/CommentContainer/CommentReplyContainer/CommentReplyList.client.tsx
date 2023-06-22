import { CommentReply } from '~/modules/CommentContainer/CommentReplyContainer/CommentReply.client';
import { CommentModel } from '~/types/comment';

type CommentReplyListProps = Pick<CommentModel, 'commentReplyInfos'> & {
  isShowReplyList: boolean;
};
export const CommentReplyList = ({ commentReplyInfos, isShowReplyList }: CommentReplyListProps) => {
  return (
    <>
      {isShowReplyList && (
        <ul className="mt-24pxr flex flex-col gap-24pxr">
          {commentReplyInfos.map(commentReply => (
            <CommentReply key={commentReply.commentReplyId} {...commentReply} />
          ))}
        </ul>
      )}
    </>
  );
};

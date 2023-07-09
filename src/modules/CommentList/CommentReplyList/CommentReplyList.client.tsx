'use client';
import { Suspense } from 'react';

import { useGetCommentReplies } from '~/api/domain/comment/comment.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { CommentReply } from '~/modules/CommentList/CommentReplyList/CommentReply.client';
import { CommentModel } from '~/types/comment';

type CommentReplyListProps = Pick<CommentModel, 'idCardId' | 'commentId'> & {
  isShowReplyList: boolean;
};
const CommentReplyListComponent = ({ idCardId, commentId }: CommentReplyListProps) => {
  const { data } = useGetCommentReplies({ idCardId, commentId });
  const commentReplyList = data?.repliesInfo;
  return (
    <ul className="mt-24pxr flex flex-col gap-24pxr">
      {commentReplyList?.map(commentReply => (
        <CommentReply
          key={commentReply.commentReplyId}
          idCardId={idCardId}
          commentId={commentId}
          {...commentReply}
        />
      ))}
    </ul>
  );
};

export const CommentReplyList = ({
  idCardId,
  commentId,
  isShowReplyList,
}: CommentReplyListProps) => {
  return (
    <>
      {isShowReplyList && (
        <RetryErrorBoundary>
          <Suspense>
            <CommentReplyListComponent
              idCardId={idCardId}
              commentId={commentId}
              isShowReplyList={isShowReplyList}
            />
          </Suspense>
        </RetryErrorBoundary>
      )}
    </>
  );
};

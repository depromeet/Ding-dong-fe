/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useDeleteCommentReplyLike, usePostLikeCommentReply } from '~/api/domain/comment.api';
import {
  Content,
  DeleteButton,
  Header,
  LikeCount,
  LikeIcon,
  ReplySubmitButton,
  ReportButton,
  UserProfile,
} from '~/modules/CommentList/CommentCommon';
import { useLike } from '~/modules/CommentList/useLike';
import { CommentModel, CommentReplyModel } from '~/types/comment';
import { getUserIdClient } from '~/utils/auth/getUserId.client';

type CommentProps = Pick<CommentModel, 'idCardId' | 'commentId'> & CommentReplyModel;

export const CommentReply = ({
  idCardId,
  commentId,
  commentReplyId,
  content,
  createdAt,
  writerInfo,
  commentReplyLikeInfo,
}: CommentProps) => {
  const { userId: writerId, profileImageUrl, nickname } = writerInfo;
  const { isLikedByCurrentUser, likeCount, likeComment, cancelLikeComment } =
    useLike(commentReplyLikeInfo);
  const userId = getUserIdClient();

  const mutatePostLike = usePostLikeCommentReply({
    onError: () => {
      // TODO toast error
      cancelLikeComment();
    },
  });

  const mutateDeleteLike = useDeleteCommentReplyLike({
    onError: () => {
      // TODO toast error
      likeComment();
    },
  });

  const onClickToLike = async () => {
    likeComment();
    mutatePostLike.mutate({ idCardId, commentId, commentReplyId });
  };

  const onClickToLikeCancel = async () => {
    cancelLikeComment();
    mutateDeleteLike.mutate({ idCardId, commentId, commentReplyId });
  };

  return (
    <li className="flex w-full gap-12pxr px-[calc(layout-sm+42px)]">
      <UserProfile profileImageUrl={profileImageUrl} />
      <div className="w-full">
        <Header nickname={nickname} createdAt={createdAt} />
        <div className="flex w-full gap-12pxr">
          <div className="w-full">
            <Content content={content} />
            <div className="mt-8pxr flex gap-16pxr">
              <LikeCount likeCount={likeCount} />
              <ReplySubmitButton nickname={nickname} commentId={commentId} />
              {userId === writerId ? <DeleteButton /> : <ReportButton />}
            </div>
          </div>
          <div>
            <LikeIcon
              isLikedByCurrentUser={isLikedByCurrentUser}
              onClickToLike={onClickToLike}
              onClickToLikeCancel={onClickToLikeCancel}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

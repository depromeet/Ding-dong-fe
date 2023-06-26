'use client';
import { useState } from 'react';

import { useDeleteCommentReplyLike, usePostLikeCommentReply } from '~/api/domain/comment.api';
import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel, CommentReplyModel } from '~/types/comment';

type CommentReplyLikeProps = Pick<CommentModel, 'commentReplyLikeInfo' | 'commentId' | 'idCardId'> &
  Pick<CommentReplyModel, 'commentReplyId'>;

export const CommentReplyLike = ({
  idCardId,
  commentReplyLikeInfo,
  commentId,
  commentReplyId,
}: CommentReplyLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    commentReplyLikeInfo.isLikedByCurrentUser,
  );

  const likeComment = () => {
    setIsLikedByCurrentUser(true);
  };

  const cancelLikeComment = () => {
    setIsLikedByCurrentUser(false);
  };

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
    <>
      {isLikedByCurrentUser ? (
        <HeartFillIcon onClick={onClickToLikeCancel} className="fill-blue-500" />
      ) : (
        <HeartIcon onClick={onClickToLike} className="fill-grey-400" />
      )}
    </>
  );
};

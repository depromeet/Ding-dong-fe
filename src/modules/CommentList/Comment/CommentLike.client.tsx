'use client';
import { useState } from 'react';

import { useDeleteCommentLike, usePostLikeComment } from '~/api/domain/comment.api';
import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel } from '~/types/comment';

type CommentLikeProps = Pick<CommentModel, 'commentReplyLikeInfo' | 'commentId' | 'idCardId'>;

export const CommentLike = ({ idCardId, commentReplyLikeInfo, commentId }: CommentLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    commentReplyLikeInfo.isLikedByCurrentUser,
  );

  const likeComment = () => {
    setIsLikedByCurrentUser(true);
  };

  const cancelLikeComment = () => {
    setIsLikedByCurrentUser(false);
  };

  const mutatePostLike = usePostLikeComment({
    onError: () => {
      // TODO toast error
      cancelLikeComment();
    },
  });

  const mutateDeleteLike = useDeleteCommentLike({
    onError: () => {
      // TODO toast error
      likeComment();
    },
  });

  const onClickToLike = async () => {
    likeComment();
    mutatePostLike.mutate({ idCardId, commentId });
  };

  const onClickToLikeCancel = async () => {
    cancelLikeComment();
    mutateDeleteLike.mutate({ idCardId, commentId });
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

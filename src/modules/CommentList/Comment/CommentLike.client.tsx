'use client';
import { useEffect, useState } from 'react';

import { useDeleteCommentLike, usePostLikeComment } from '~/api/domain/comment.api';
import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel } from '~/types/comment';

type CommentLikeProps = Pick<CommentModel, 'commentReplyLikeInfo' | 'commentId' | 'idCardId'>;

export const CommentLike = ({ idCardId, commentReplyLikeInfo, commentId }: CommentLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    commentReplyLikeInfo.isLikedByCurrentUser,
  );

  const { mutate: mutatePostLike, isSuccess: isSuccessPostLike } = usePostLikeComment({
    idCardId,
    commentId,
  });

  const { mutate: mutateDeleteLike, isSuccess: isSuccessDeleteLike } = useDeleteCommentLike({
    idCardId,
    commentId,
  });

  const onClickToLike = async () => {
    mutatePostLike();
  };

  const onClickToUnLike = async () => {
    mutateDeleteLike();
  };

  useEffect(() => {
    setIsLikedByCurrentUser(isSuccessPostLike);
  }, [isSuccessPostLike]);

  useEffect(() => {
    setIsLikedByCurrentUser(!isSuccessDeleteLike);
  }, [isSuccessDeleteLike]);

  return (
    <>
      {isLikedByCurrentUser ? (
        <HeartFillIcon onClick={onClickToUnLike} className="fill-blue-500" />
      ) : (
        <HeartIcon onClick={onClickToLike} className="fill-grey-400" />
      )}
    </>
  );
};

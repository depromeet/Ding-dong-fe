/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';

import { useDeleteCommentLike, usePostLikeComment } from '~/api/domain/comment.api';
import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel } from '~/types/comment';

// FIXME: https://github.com/depromeet/Ding-dong-fe/pull/113 이거 머지되면 타입 수정하기
type CommentLikeProps = Pick<CommentModel, 'commentReplyLikeInfo' | 'commentId'> & {
  idCardsId: number;
};

export const CommentLike = ({ idCardsId, commentReplyLikeInfo, commentId }: CommentLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    commentReplyLikeInfo.isLikedByCurrentUser,
  );

  const { mutate: mutatePostLike, isSuccess: isSuccessPostLike } = usePostLikeComment({
    idCardsId,
    commentId,
  });

  const { mutate: mutateDeleteLike, isSuccess: isSuccessDeleteLike } = useDeleteCommentLike({
    idCardsId,
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

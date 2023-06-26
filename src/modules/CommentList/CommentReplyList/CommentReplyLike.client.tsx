'use client';
import { useEffect, useState } from 'react';

import { useDeleteCommentReplyLike, usePostLikeReply } from '~/api/domain/comment.api';
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

  const { mutate: mutatePostLike, isSuccess: isSuccessPostLike } = usePostLikeReply({
    idCardId,
    commentId,
    commentReplyId,
  });

  const { mutate: mutateDeleteLike, isSuccess: isSuccessDeleteLike } = useDeleteCommentReplyLike({
    idCardId,
    commentId,
    commentReplyId,
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

/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import { useEffect, useState } from 'react';

import { useDeleteCommentReplyLike, usePostLikeReply } from '~/api/domain/comment.api';
import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel, CommentReplyModel } from '~/types/comment';

// FIXME: https://github.com/depromeet/Ding-dong-fe/pull/113 이거 머지되면 타입 수정하기
type CommentReplyLikeProps = Pick<CommentModel, 'commentReplyLikeInfo' | 'commentId'> &
  Pick<CommentReplyModel, 'commentReplyId'> & {
    idCardsId: number;
  };

export const CommentReplyLike = ({
  idCardsId,
  commentReplyLikeInfo,
  commentId,
  commentReplyId,
}: CommentReplyLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    commentReplyLikeInfo.isLikedByCurrentUser,
  );

  const { mutate: mutatePostLike, isSuccess: isSuccessPostLike } = usePostLikeReply({
    idCardsId,
    commentId,
    commentReplyId,
  });

  const { mutate: mutateDeleteLike, isSuccess: isSuccessDeleteLike } = useDeleteCommentReplyLike({
    idCardsId,
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

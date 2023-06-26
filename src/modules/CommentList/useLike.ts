import { useState } from 'react';

import { CommentLikeModel } from '~/types/comment';

type UseLikeProps = CommentLikeModel;

export const useLike = ({
  isLikedByCurrentUser: initIsLikedByCurrentUser,
  likeCount: initLikeCount,
}: UseLikeProps) => {
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(initIsLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(initLikeCount);

  const likeComment = () => {
    setIsLikedByCurrentUser(true);
    setLikeCount(prev => prev + 1);
  };

  const cancelLikeComment = () => {
    setIsLikedByCurrentUser(false);
    setLikeCount(prev => (prev === 0 ? prev : prev - 1));
  };

  return {
    isLikedByCurrentUser,
    likeCount,
    likeComment,
    cancelLikeComment,
  };
};

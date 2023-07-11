import { useState } from 'react';

import { CommentLikeModel } from '~/types/comment';

type UseLikeProps = CommentLikeModel;

export const useLike = ({
  likedByCurrentUser: initLikedByCurrentUser,
  likeCount: initLikeCount,
}: UseLikeProps) => {
  const [likedByCurrentUser, setLikedByCurrentUser] = useState(initLikedByCurrentUser);
  const [likeCount, setLikeCount] = useState(initLikeCount);

  const likeComment = () => {
    setLikedByCurrentUser(true);
    setLikeCount(prev => prev + 1);
  };

  const cancelLikeComment = () => {
    setLikedByCurrentUser(false);
    setLikeCount(prev => (prev === 0 ? prev : prev - 1));
  };

  return {
    likedByCurrentUser,
    likeCount,
    likeComment,
    cancelLikeComment,
  };
};

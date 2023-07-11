'use client';

import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentLikeModel } from '~/types/comment';

type LikeIconProps = Pick<CommentLikeModel, 'likedByCurrentUser'> & {
  onClickToLikeCancel: () => Promise<void>;
  onClickToLike: () => Promise<void>;
};

export const LikeIcon = ({
  likedByCurrentUser,
  onClickToLikeCancel,
  onClickToLike,
}: LikeIconProps) => {
  return (
    <>
      {likedByCurrentUser ? (
        <HeartFillIcon onClick={onClickToLikeCancel} className="fill-blue-500" />
      ) : (
        <HeartIcon onClick={onClickToLike} className="fill-grey-400" />
      )}
    </>
  );
};

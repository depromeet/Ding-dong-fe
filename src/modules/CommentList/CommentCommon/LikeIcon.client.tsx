'use client';

import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentLikeModel } from '~/types/comment';

type LikeIconProps = Pick<CommentLikeModel, 'isLikedByCurrentUser'> & {
  onClickToLikeCancel: () => Promise<void>;
  onClickToLike: () => Promise<void>;
};

export const LikeIcon = ({
  isLikedByCurrentUser,
  onClickToLikeCancel,
  onClickToLike,
}: LikeIconProps) => {
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

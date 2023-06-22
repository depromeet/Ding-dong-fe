import { HeartFillIcon, HeartIcon } from '~/components/Icon';
import { CommentModel } from '~/types/comment';

type LikeIconProps = Pick<CommentModel, 'commentReplyLikeInfo'>;

export const LikeIcon = ({ commentReplyLikeInfo }: LikeIconProps) => {
  return (
    <>
      {commentReplyLikeInfo.isLikedByCurrentUser ? (
        <HeartFillIcon className="fill-blue-500" />
      ) : (
        <HeartIcon className="fill-grey-400" />
      )}
    </>
  );
};

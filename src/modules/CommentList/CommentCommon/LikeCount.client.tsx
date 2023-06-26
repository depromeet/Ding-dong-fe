import { CommentLikeModel } from '~/types/comment';

type LikeCountProps = Pick<CommentLikeModel, 'likeCount'>;

export const LikeCount = ({ likeCount }: LikeCountProps) => {
  const countMessage = likeCount === 0 ? '좋아요' : `좋아요 ${likeCount}개`;
  return <span className="text-detail text-grey-500">{countMessage}</span>;
};

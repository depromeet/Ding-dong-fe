import { CommentLikeModel } from '~/types/comment';

type LikeCountProps = Pick<CommentLikeModel, 'likeCount'>;

export const LikeCount = ({ likeCount }: LikeCountProps) => {
  return <span className="text-detail text-grey-500">좋아요 {likeCount}개</span>;
};

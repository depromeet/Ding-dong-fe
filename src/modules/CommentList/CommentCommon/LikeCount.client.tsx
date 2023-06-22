import { CommentModel } from '~/types/comment';

type LikeCountProps = Pick<CommentModel, 'commentReplyLikeInfo'>;

export const LikeCount = ({ commentReplyLikeInfo }: LikeCountProps) => {
  return (
    <span className="text-detail text-grey-500">좋아요 {commentReplyLikeInfo.likeCount}개</span>
  );
};

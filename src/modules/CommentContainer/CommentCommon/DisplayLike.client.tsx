import { CommentModel } from '~/types/comment';

type DisplayLikeProps = Pick<CommentModel, 'commentReplyLikeInfo'>;

export const DisplayLike = ({ commentReplyLikeInfo }: DisplayLikeProps) => {
  return (
    <span className="text-detail text-grey-500">좋아요 {commentReplyLikeInfo.likeCount}개</span>
  );
};

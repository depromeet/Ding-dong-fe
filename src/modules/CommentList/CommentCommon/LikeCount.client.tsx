import { CommentLikeModel } from '~/types/comment';

type LikeCountProps = Pick<CommentLikeModel, 'likeCount'>;

export const LikeCount = ({ likeCount }: LikeCountProps) => {
  const isShowLikeText = likeCount !== 0;
  return (
    <>
      {isShowLikeText && (
        <span className="text-detail font-medium text-grey-500">좋아요 {likeCount}개</span>
      )}
    </>
  );
};

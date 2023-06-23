import { getCommentCountsServer } from '~/api/domain/comment.api.server';

type CommentCountProps = {
  idCardsId: number;
};

export const CommentCount = async ({ idCardsId }: CommentCountProps) => {
  const totalCommentCount = await getCommentCountsServer({ idCardsId });

  return (
    <div className="mt-24pxr px-layout-sm text-b2 text-grey-900">
      <span>댓글 {totalCommentCount.count}개</span>
    </div>
  );
};

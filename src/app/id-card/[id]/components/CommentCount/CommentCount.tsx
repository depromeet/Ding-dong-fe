import { Suspense } from 'react';

import { getCommentCountsServer } from '~/api/domain/comment.api.server';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';

type CommentCountProps = {
  idCardId: number;
};

const CommentCountComponent = async ({ idCardId }: CommentCountProps) => {
  const totalCommentCount = await getCommentCountsServer({ idCardId });

  return (
    <div className="mt-24pxr px-layout-sm text-b2 text-grey-900">
      <span>댓글 {totalCommentCount.count}개</span>
    </div>
  );
};

export const CommentCount = ({ idCardId }: CommentCountProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        {/* @ts-expect-error Server Component */}
        <CommentCountComponent idCardId={idCardId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

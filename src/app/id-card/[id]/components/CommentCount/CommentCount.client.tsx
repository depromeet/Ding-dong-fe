'use client';
import { Suspense } from 'react';

import { useGetCommentCounts } from '~/api/domain/comment.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';

type CommentCountProps = {
  idCardId: number;
};

const CommentCountComponent = ({ idCardId }: CommentCountProps) => {
  const { data: totalCommentCount } = useGetCommentCounts({ idCardId });

  return (
    <div className="mt-24pxr px-layout-sm text-b2 text-grey-900">
      {totalCommentCount && <span>댓글 {totalCommentCount.count}개</span>}
    </div>
  );
};

export const CommentCount = ({ idCardId }: CommentCountProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <CommentCountComponent idCardId={idCardId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

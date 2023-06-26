'use client';

import { Suspense, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetComments } from '~/api/domain/comment.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { Comment } from '~/modules/CommentList/Comment';
import { CommentModel } from '~/types/comment';

type CommentListProps = {
  idCardsId: number;
};

const CommentListComponent = ({ idCardsId }: CommentListProps) => {
  const { data: commentList, fetchNextPage } = useGetComments({
    idCardsId,
    pageParam: 1,
  });
  // TODO: CommunityIdCards에서 사용하는 로직과 통일하기
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && commentList?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, commentList?.pages]);

  return (
    <div className="mt-24pxr flex flex-col gap-24pxr">
      {commentList?.pages.map(page =>
        page.data.content.map((comment: CommentModel) => (
          <Comment key={comment.commentId} {...comment} />
        )),
      )}
      <div ref={ref}></div>
    </div>
  );
};

export const CommentList = ({ idCardsId }: CommentListProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <CommentListComponent idCardsId={idCardsId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

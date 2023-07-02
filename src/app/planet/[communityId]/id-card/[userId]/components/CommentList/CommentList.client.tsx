'use client';

import { Suspense, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetComments } from '~/api/domain/comment/comment.api';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { Comment } from '~/modules/CommentList/Comment';
import { Empty } from '~/modules/CommentList/CommentCommon';
import { CommentModel } from '~/types/comment';

type CommentListProps = {
  idCardId: number;
};

const CommentListComponent = ({ idCardId }: CommentListProps) => {
  const { data: commentList, fetchNextPage } = useGetComments({
    idCardId,
    pageParam: 1,
  });
  // TODO: CommunityIdCards에서 사용하는 로직과 통일하기
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && commentList?.pages) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, commentList?.pages]);

  const isEmpty = commentList?.pages[0].content.length === 0;

  return (
    <div className="mt-24pxr flex flex-col gap-24pxr pb-50pxr">
      {isEmpty ? (
        <Empty />
      ) : (
        commentList?.pages.map(page =>
          page.content.map((comment: CommentModel) => (
            <Comment key={comment.commentId} {...comment} />
          )),
        )
      )}
      <div ref={ref}></div>
    </div>
  );
};

export const CommentList = ({ idCardId }: CommentListProps) => {
  return (
    <RetryErrorBoundary>
      <Suspense>
        <CommentListComponent idCardId={idCardId} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

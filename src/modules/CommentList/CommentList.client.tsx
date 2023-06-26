'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetComments } from '~/api/domain/comment.api';
import { Comment } from '~/modules/CommentList/Comment';
import { Empty } from '~/modules/CommentList/CommentCommon';
import { CommentModel } from '~/types/comment';

type CommentListProps = {
  idCardId: number;
};

export const CommentList = ({ idCardId }: CommentListProps) => {
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

  const isEmpty = commentList?.pages[0].data.content.length === 0;

  return (
    <div className="mt-24pxr flex flex-col gap-24pxr pb-50pxr">
      {isEmpty ? (
        <Empty />
      ) : (
        commentList?.pages.map(page =>
          page.data.content.map((comment: CommentModel) => (
            <Comment key={comment.commentId} {...comment} />
          )),
        )
      )}
      <div ref={ref}></div>
    </div>
  );
};

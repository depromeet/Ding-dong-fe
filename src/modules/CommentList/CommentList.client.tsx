'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useGetComments } from '~/api/domain/comment.api';
import { Comment } from '~/modules/Comment/Comment.client';
import { CommentModel } from '~/types/comment';

type CommentListProps = {
  idCardsId: number;
};

export const CommentList = ({ idCardsId }: CommentListProps) => {
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
    <div>
      {commentList?.pages.map(page =>
        page.commentDto.content.map((comment: CommentModel) => (
          <Comment key={comment.commentId} {...comment} />
        )),
      )}
      <div ref={ref}></div>
    </div>
  );
};
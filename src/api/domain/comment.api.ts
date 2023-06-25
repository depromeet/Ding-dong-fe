import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import {
  CommentCountGetRequest,
  CommentCountGetResponse,
  CommentDeleteReplyResponse,
  CommentDeleteRequest,
  CommentDeleteResponse,
  CommentGetRequest,
  CommentGetResponse,
  CommentPostReplyRequest,
  CommentPostReplyResponse,
  CommentPostRequest,
  CommentPostResponse,
  CommentReplyDeleteRequest,
} from '~/types/comment';

const FIRST_COMMENT_PAGE = 1;
export const commentQueryKey = {
  comments: (idCardsId: number, pageParam: number) => ['comments', idCardsId, pageParam],
  commentCount: (idCardsId: number) => ['commentCount', idCardsId],
};

export const getComments = ({ idCardsId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardsId}/comments?page=${pageParam}&size=10`);

export const useGetComments = ({ idCardsId, pageParam }: CommentGetRequest) => {
  return useInfiniteQuery(
    commentQueryKey.comments(idCardsId, pageParam),
    ({ pageParam = 0 }) => getComments({ idCardsId, pageParam }),
    {
      getNextPageParam: data => (!data.data.hasNext ? data.data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

export const getCommentCounts = ({ idCardsId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardsId}/comments-count`);

export const useGetCommentCounts = ({ idCardsId }: CommentCountGetRequest) =>
  useQuery(commentQueryKey.commentCount(idCardsId), () => getCommentCounts({ idCardsId }));

export const postCommentCreate = ({ idCardsId, contents }: CommentPostRequest) =>
  privateApi.post<CommentPostResponse>(`id-cards/${idCardsId}/comments`, { contents });

export const usePostCommentCreate = (idCardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentPostRequest) => postCommentCreate(commentInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, FIRST_COMMENT_PAGE)),
  });
};

export const deleteComment = ({ idCardsId, commentId }: CommentDeleteRequest) =>
  privateApi.delete<CommentDeleteResponse>(`id-cards/${idCardsId}/comments/${commentId}`);

export const useDeleteComment = (idCardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentDeleteRequest) => deleteComment(commentInfo),
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, 0)),
  });
};

export const postReplyCreate = ({ idCardsId, commentId, contents }: CommentPostReplyRequest) =>
  privateApi.post<CommentPostReplyResponse>(
    `/id-cards/${idCardsId}/comments/${commentId}/replies`,
    { contents },
  );

export const usePostReplyCreate = (idCardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyInfo: CommentPostReplyRequest) => postCommentCreate(replyInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, FIRST_COMMENT_PAGE)),
  });
};

export const deleteReply = ({ idCardsId, commentId, commentReplyId }: CommentReplyDeleteRequest) =>
  privateApi.delete<CommentDeleteReplyResponse>(
    `/id-cards/${idCardsId}/comments/${commentId}/replies/${commentReplyId}`,
  );

export const useDeleteReply = (idCardsId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyInfo: CommentReplyDeleteRequest) => deleteReply(replyInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, FIRST_COMMENT_PAGE)),
  });
};
  });
};

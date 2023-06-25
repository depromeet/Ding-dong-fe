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
  CommentLikeCancelDeleteResponse,
  CommentLikeCancelRequest,
  CommentLikePostResponse,
  CommentLikeRequest,
  CommentPostReplyRequest,
  CommentPostReplyResponse,
  CommentPostRequest,
  CommentPostResponse,
  CommentReplyDeleteRequest,
  CommentReplyLikeCancelDeleteResponse,
  CommentReplyLikeCancelRequest,
  CommentReplyLikePostResponse,
  CommentReplyLikeRequest,
} from '~/types/comment';

const FIRST_COMMENT_PAGE = 1;

export const commentQueryKey = {
  comments: (idCardsId: number, pageParam: number) => ['comments', idCardsId, pageParam],
  commentCount: (idCardsId: number) => ['commentCounts', idCardsId],
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
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, FIRST_COMMENT_PAGE)),
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

export const postLikeComment = ({ idCardsId, commentId }: CommentLikeRequest) =>
  privateApi.post<CommentLikePostResponse>(`/id-cards/${idCardsId}/comments/${commentId}/likes`);

export const usePostLikeComment = ({ idCardsId, commentId }: CommentLikeRequest) => {
  return useMutation({
    mutationFn: () => postLikeComment({ idCardsId, commentId }),
    onError: () => {
      // 토스트 알람
      return false;
    },
  });
};

export const postLikeReply = ({ idCardsId, commentId, commentReplyId }: CommentReplyLikeRequest) =>
  privateApi.post<CommentReplyLikePostResponse>(
    `/id-cards/${idCardsId}/comments/${commentId}/replies/${commentReplyId}/reply-likes`,
  );

export const usePostLikeReply = ({
  idCardsId,
  commentId,
  commentReplyId,
}: CommentReplyLikeRequest) => {
  return useMutation({
    mutationFn: () => postLikeReply({ idCardsId, commentId, commentReplyId }),
    onError: () => {
      // 토스트 알람
      return false;
    },
  });
};

export const deleteCommentLike = ({ idCardsId, commentId }: CommentLikeCancelRequest) =>
  privateApi.delete<CommentLikeCancelDeleteResponse>(
    `/id-cards/${idCardsId}/comments/${commentId}/likes`,
  );

export const useDeleteCommentLike = ({ idCardsId, commentId }: CommentLikeCancelRequest) => {
  return useMutation({
    mutationFn: () => deleteCommentLike({ idCardsId, commentId }),
    onError: () => {
      // 토스트 알람
    },
  });
};

export const deleteCommentReplyLike = ({
  idCardsId,
  commentId,
  commentReplyId,
}: CommentReplyLikeCancelRequest) =>
  privateApi.delete<CommentReplyLikeCancelDeleteResponse>(
    `/id-cards/${idCardsId}/comments/${commentId}/replies/${commentReplyId}/reply-likes/`,
  );

export const useDeleteCommentReplyLike = ({
  idCardsId,
  commentId,
  commentReplyId,
}: CommentReplyLikeCancelRequest) => {
  return useMutation({
    mutationFn: () => deleteCommentReplyLike({ idCardsId, commentId, commentReplyId }),
    onError: () => {
      // 토스트 알람
    },
  });
};

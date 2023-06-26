import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

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
  comments: (idCardId: number, pageParam: number) => ['comments', idCardId, pageParam],
  commentCount: (idCardId: number) => ['commentCount', idCardId],
};

export const getComments = ({ idCardId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardId}/comments?page=${pageParam}&size=10`);

export const useGetComments = ({ idCardId, pageParam }: CommentGetRequest) => {
  return useInfiniteQuery(
    commentQueryKey.comments(idCardId, pageParam),
    ({ pageParam = 0 }) => getComments({ idCardId, pageParam }),
    {
      getNextPageParam: data => (!data.data.hasNext ? data.data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

export const getCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardId}/comments-count`);

export const useGetCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  useQuery(commentQueryKey.commentCount(idCardId), () => getCommentCounts({ idCardId }));

export const postCommentCreate = ({ idCardId, contents }: CommentPostRequest) =>
  privateApi.post<CommentPostResponse>(`id-cards/${idCardId}/comments`, { contents });

export const usePostCommentCreate = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentPostRequest) => postCommentCreate(commentInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardId, FIRST_COMMENT_PAGE)),
  });
};

export const deleteComment = ({ idCardId, commentId }: CommentDeleteRequest) =>
  privateApi.delete<CommentDeleteResponse>(`id-cards/${idCardId}/comments/${commentId}`);

export const useDeleteComment = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentDeleteRequest) => deleteComment(commentInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardId, FIRST_COMMENT_PAGE)),
  });
};

export const postReplyCreate = ({ idCardId, commentId, contents }: CommentPostReplyRequest) =>
  privateApi.post<CommentPostReplyResponse>(`/id-cards/${idCardId}/comments/${commentId}/replies`, {
    contents,
  });

export const usePostReplyCreate = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyInfo: CommentPostReplyRequest) => postCommentCreate(replyInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardId, FIRST_COMMENT_PAGE)),
  });
};

export const deleteReply = ({ idCardId, commentId, commentReplyId }: CommentReplyDeleteRequest) =>
  privateApi.delete<CommentDeleteReplyResponse>(
    `/id-cards/${idCardId}/comments/${commentId}/replies/${commentReplyId}`,
  );

export const useDeleteReply = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyInfo: CommentReplyDeleteRequest) => deleteReply(replyInfo),
    onSuccess: () =>
      queryClient.invalidateQueries(commentQueryKey.comments(idCardId, FIRST_COMMENT_PAGE)),
  });
};

export const postLikeComment = ({ idCardId, commentId }: CommentLikeRequest) =>
  privateApi.post<CommentLikePostResponse>(`/id-cards/${idCardId}/comments/${commentId}/likes`);

export const usePostLikeComment = (
  options?: Omit<
    UseMutationOptions<CommentLikePostResponse, AxiosError, CommentLikeRequest>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: postLikeComment,
    ...options,
  });
};

export const postLikeReply = ({ idCardId, commentId, commentReplyId }: CommentReplyLikeRequest) =>
  privateApi.post<CommentReplyLikePostResponse>(
    `/id-cards/${idCardId}/comments/${commentId}/replies/${commentReplyId}/reply-likes`,
  );

export const usePostLikeReply = (
  options?: Omit<
    UseMutationOptions<CommentReplyLikePostResponse, AxiosError, CommentReplyLikeRequest>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: postLikeReply,
    ...options,
  });
};

export const deleteCommentLike = ({ idCardId, commentId }: CommentLikeCancelRequest) =>
  privateApi.delete<CommentLikeCancelDeleteResponse>(
    `/id-cards/${idCardId}/comments/${commentId}/likes`,
  );

export const useDeleteCommentLike = (
  options?: Omit<
    UseMutationOptions<CommentLikeCancelDeleteResponse, AxiosError, CommentLikeCancelRequest>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: deleteCommentLike,
    ...options,
  });
};

export const deleteCommentReplyLike = ({
  idCardId,
  commentId,
  commentReplyId,
}: CommentReplyLikeCancelRequest) => {
  return privateApi.delete<CommentReplyLikeCancelDeleteResponse>(
    `/id-cards/${idCardId}/comments/${commentId}/replies/${commentReplyId}/reply-likes/`,
  );
};

export const useDeleteCommentReplyLike = (
  options?: Omit<
    UseMutationOptions<
      CommentReplyLikeCancelDeleteResponse,
      AxiosError,
      CommentReplyLikeCancelRequest
    >,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: deleteCommentReplyLike,
    ...options,
  });
};

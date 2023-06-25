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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId, 0)),
  });
};

export const deleteComment = ({ idCardId, commentId }: CommentDeleteRequest) =>
  privateApi.delete<CommentDeleteResponse>(`id-cards/${idCardId}/comments/${commentId}`);

export const useDeleteComment = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentDeleteRequest) => deleteComment(commentInfo),
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId, 0)),
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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId, 0)),
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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId, 0)),
  });
};

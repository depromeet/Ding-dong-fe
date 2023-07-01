import {
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';

import privateApi from '~/api/config/privateApi';
import { useToastMessageStore } from '~/stores/toastMessage.store';
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
import { UserInfoModel } from '~/types/user';
import {
  addCommentToPages,
  addReplyToPages,
  CommentPages,
  createNewComment,
  createNewReply,
  decreaseCommentCount,
  increaseCommentCount,
  removeCommentToPages,
  removeReplyToPages,
  updateCommentId,
  updateReplyId,
} from '~/utils/commentApi.util';

export const commentQueryKey = {
  comments: (idCardId: number) => ['comments', idCardId],
  commentCount: (idCardId: number) => ['commentCount', idCardId],
};

export const getComments = ({ idCardId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardId}/comments?page=${pageParam}&size=10`);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useGetComments = ({ idCardId, pageParam }: CommentGetRequest) => {
  return useInfiniteQuery(
    commentQueryKey.comments(idCardId),
    ({ pageParam = 0 }) => getComments({ idCardId, pageParam }),
    {
      getNextPageParam: data => (!data.data.hasNext ? data.data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
      useErrorBoundary: true,
    },
  );
};

export const getCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardId}/comments-count`);

export const useGetCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  useQuery(commentQueryKey.commentCount(idCardId), () => getCommentCounts({ idCardId }));

export const postCommentCreate = ({ idCardId, contents }: CommentPostRequest) =>
  privateApi.post<CommentPostResponse>(`id-cards/${idCardId}/comments`, { contents });

export const usePostCommentCreate = (idCardId: number, userInfo: UserInfoModel) => {
  const queryClient = useQueryClient();
  const { errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: (commentInfo: CommentPostRequest) => postCommentCreate(commentInfo),
    onMutate: async (commentInfo: CommentPostRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      const newComment = createNewComment({
        idCardId: idCardId,
        contents: commentInfo.contents,
        nickname: userInfo.nickname,
        profileImageUrl: userInfo.profileImageUrl,
        userId: userInfo.userId,
      });

      const previousComments = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );

      const previousCommentCount = queryClient.getQueryData<CommentCountGetResponse>(
        commentQueryKey.commentCount(idCardId),
      );

      const updatedComments = addCommentToPages(previousComments, newComment);
      queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedComments);

      const updatedCommentCount = increaseCommentCount(previousCommentCount);
      queryClient.setQueryData(commentQueryKey.commentCount(idCardId), updatedCommentCount);

      return { previousComments, previousCommentCount };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments !== undefined && context?.previousCommentCount !== undefined) {
        // TODO: toast error
        errorToast('에러');
        queryClient.setQueryData(commentQueryKey.comments(idCardId), context.previousComments);
        queryClient.setQueryData(
          commentQueryKey.commentCount(idCardId),
          context.previousCommentCount,
        );
      }
    },
    onSuccess: response => {
      const commentId = response.id;

      queryClient.setQueryData<CommentPages | undefined>(
        commentQueryKey.comments(idCardId),
        previousComments => updateCommentId(previousComments, commentId),
      );
    },
  });
};

export const deleteComment = ({ idCardId, commentId }: CommentDeleteRequest) =>
  privateApi.delete<CommentDeleteResponse>(`id-cards/${idCardId}/comments/${commentId}`);

export const useDeleteComment = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentDeleteRequest) => deleteComment(commentInfo),
    onMutate: async (commentInfo: CommentDeleteRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      const previousComments = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );

      const previousCommentCount = queryClient.getQueryData<CommentCountGetResponse>(
        commentQueryKey.commentCount(idCardId),
      );

      const updatedComments = removeCommentToPages(previousComments, commentInfo.commentId);
      queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedComments);

      const updatedCommentCount = decreaseCommentCount(previousCommentCount);
      queryClient.setQueryData(commentQueryKey.commentCount(idCardId), updatedCommentCount);

      return { previousComments, previousCommentCount };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments !== undefined && context?.previousCommentCount !== undefined) {
        // TODO: toast error
        queryClient.setQueryData(commentQueryKey.comments(idCardId), context.previousComments);
        queryClient.setQueryData(
          commentQueryKey.commentCount(idCardId),
          context.previousCommentCount,
        );
      }
    },
  });
};

export const postReplyCreate = ({ idCardId, commentId, contents }: CommentPostReplyRequest) =>
  privateApi.post<CommentPostReplyResponse>(`/id-cards/${idCardId}/comments/${commentId}/replies`, {
    contents,
  });

export const usePostReplyCreate = (idCardId: number, userInfo: UserInfoModel) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyInfo: CommentPostReplyRequest) => postReplyCreate(replyInfo),
    onMutate: async (commentInfo: CommentPostReplyRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      const newReply = createNewReply({
        contents: commentInfo.contents,
        nickname: userInfo.nickname,
        profileImageUrl: userInfo.profileImageUrl,
        userId: userInfo.userId,
      });

      const previousComments = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );

      const updatedComments = addReplyToPages(previousComments, newReply, commentInfo.commentId);
      queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedComments);

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        // TODO: toast error
        queryClient.setQueryData(commentQueryKey.comments(idCardId), context.previousComments);
      }
    },
    onSuccess: (response, commentReplyInfos) => {
      const replyId = response.id;
      const commentId = commentReplyInfos.commentId;

      queryClient.setQueryData<CommentPages | undefined>(
        commentQueryKey.comments(idCardId),
        previousComments => updateReplyId(previousComments, commentId, replyId),
      );
    },
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
    onMutate: async (replyInfo: CommentReplyDeleteRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      const previousComments = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );

      const updatedComments = removeReplyToPages(
        previousComments,
        replyInfo.commentId,
        replyInfo.commentReplyId,
      );
      queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedComments);

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments) {
        // TODO: toast error
        queryClient.setQueryData(commentQueryKey.comments(idCardId), context.previousComments);
      }
    },
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

export const postLikeCommentReply = ({
  idCardId,
  commentId,
  commentReplyId,
}: CommentReplyLikeRequest) =>
  privateApi.post<CommentReplyLikePostResponse>(
    `/id-cards/${idCardId}/comments/${commentId}/replies/${commentReplyId}/reply-likes`,
  );

export const usePostLikeCommentReply = (
  options?: Omit<
    UseMutationOptions<CommentReplyLikePostResponse, AxiosError, CommentReplyLikeRequest>,
    'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: postLikeCommentReply,
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

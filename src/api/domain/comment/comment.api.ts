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
  addCommentToPages,
  addLikeCommentToPages,
  addLikeReplyToComment,
  addReplyCountToPages,
  addReplyToComment,
  CommentPages,
  createNewComment,
  createNewReply,
  decreaseCommentCount,
  increaseCommentCount,
  removeCommentToPages,
  removeLikeCommentToPages,
  removeLikeReplyToComment,
  removeReplyToComment,
  subtractReplyCountToPages,
  updateCommentId,
  updateReplyId,
} from '~/api/domain/comment/comment.helper';
import { communityQueryKey } from '~/api/domain/community.api';
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
  CommentReplyGetRequest,
  CommentReplyGetResponse,
  CommentReplyLikeCancelDeleteResponse,
  CommentReplyLikeCancelRequest,
  CommentReplyLikePostResponse,
  CommentReplyLikeRequest,
} from '~/types/comment';
import { CommunityUserInfoResponse } from '~/types/community';

export const commentQueryKey = {
  comments: (idCardId: number) => ['comments', idCardId],
  commentReplies: (idCardId: number, commentId: number) => ['replies', idCardId, commentId],
  commentCount: (idCardId: number) => ['commentCount', idCardId],
};

export const getComments = ({ idCardId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardId}/comments?page=${pageParam}&size=10`);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useGetComments = (idCardId: number) => {
  return useInfiniteQuery(
    commentQueryKey.comments(idCardId),
    ({ pageParam = 0 }) => getComments({ idCardId, pageParam }),
    {
      getNextPageParam: data => (data.hasNext ? data.page + 1 : undefined),
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
      useErrorBoundary: true,
    },
  );
};

export const getCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardId}/comment-count`);

export const useGetCommentCounts = ({ idCardId }: CommentCountGetRequest) =>
  useQuery(commentQueryKey.commentCount(idCardId), () => getCommentCounts({ idCardId }));

export const getCommentReplies = ({ idCardId, commentId }: CommentReplyGetRequest) =>
  privateApi.get<CommentReplyGetResponse>(`/id-cards/${idCardId}/comments/${commentId}/replies`);

export const useGetCommentReplies = ({ idCardId, commentId }: CommentReplyGetRequest) =>
  useQuery(commentQueryKey.commentReplies(idCardId, commentId), () =>
    getCommentReplies({ idCardId, commentId }),
  );

export const postCommentCreate = ({ idCardId, contents }: CommentPostRequest) =>
  privateApi.post<CommentPostResponse>(`id-cards/${idCardId}/comments`, { contents });

export const usePostCommentCreate = (idCardId: number, communityId: number) => {
  const queryClient = useQueryClient();
  const { errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: (commentInfo: CommentPostRequest) => postCommentCreate(commentInfo),
    onMutate: async (commentInfo: CommentPostRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      const userInfo = queryClient.getQueryData<CommunityUserInfoResponse>(
        communityQueryKey.communityUserInfo(communityId),
      );

      if (
        userInfo &&
        userInfo.myInfoInInCommunityDto.nickname &&
        userInfo.myInfoInInCommunityDto.profileImageUrl
      ) {
        const newComment = createNewComment({
          idCardId: idCardId,
          contents: commentInfo.contents,
          nickname: userInfo.myInfoInInCommunityDto.nickname,
          profileImageUrl: userInfo.myInfoInInCommunityDto.profileImageUrl,
          userId: userInfo.myInfoInInCommunityDto.userId,
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
      }
    },
    onError: (err, newComment, context) => {
      if (context?.previousComments !== undefined && context?.previousCommentCount !== undefined) {
        const error = err as AxiosError;
        errorToast(error.message);
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
  const { errorToast } = useToastMessageStore();

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
        const error = err as AxiosError;
        errorToast(error.message);
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

export const usePostReplyCreate = (idCardId: number, communityId: number) => {
  const queryClient = useQueryClient();
  const { errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: postReplyCreate,
    onMutate: async (commentInfo: CommentPostReplyRequest) => {
      const { contents, commentId } = commentInfo;
      await Promise.all([
        queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) }),
        queryClient.cancelQueries({
          queryKey: commentQueryKey.commentReplies(idCardId, commentId),
        }),
      ]);

      const userInfo = queryClient.getQueryData<CommunityUserInfoResponse>(
        communityQueryKey.communityUserInfo(communityId),
      );
      if (
        userInfo &&
        userInfo.myInfoInInCommunityDto.nickname &&
        userInfo.myInfoInInCommunityDto.profileImageUrl
      ) {
        const newReply = createNewReply({
          contents,
          nickname: userInfo.myInfoInInCommunityDto.nickname,
          profileImageUrl: userInfo.myInfoInInCommunityDto.profileImageUrl,
          userId: userInfo.myInfoInInCommunityDto.userId,
        });

        // update reply to target comment
        const previousCommentRepliesResponse = queryClient.getQueryData<CommentReplyGetResponse>(
          commentQueryKey.commentReplies(idCardId, commentId),
        );

        if (previousCommentRepliesResponse) {
          const updatedCommentRepliesResponse = addReplyToComment(
            newReply,
            commentId,
            previousCommentRepliesResponse.repliesInfo,
          );
          queryClient.setQueryData(
            commentQueryKey.commentReplies(idCardId, commentId),
            updatedCommentRepliesResponse,
          );
        }

        const previousCommentsResponse = queryClient.getQueryData<CommentPages>(
          commentQueryKey.comments(idCardId),
        );

        // update target comment's reply count
        const updatedCommentsResponse = addReplyCountToPages(
          previousCommentsResponse,
          commentInfo.commentId,
        );
        queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedCommentsResponse);

        return { previousCommentRepliesResponse, previousCommentsResponse, newReply };
      }
    },
    onError: (err, requestInfo, context) => {
      if (!context) return;

      const { previousCommentRepliesResponse, previousCommentsResponse } = context;
      const error = err as AxiosError;
      errorToast(error.message);
      queryClient.setQueryData(
        commentQueryKey.commentReplies(idCardId, requestInfo.commentId),
        previousCommentRepliesResponse,
      );
      queryClient.setQueryData(commentQueryKey.comments(idCardId), previousCommentsResponse);
    },
    onSuccess: (response, commentReplyInfos, context) => {
      if (!context) return;
      const { newReply } = context;
      const replyId = response.id;
      const commentId = commentReplyInfos.commentId;

      queryClient.setQueryData<CommentReplyGetResponse | undefined>(
        commentQueryKey.commentReplies(idCardId, commentId),
        previousCommentRepliesResponse =>
          updateReplyId(
            commentId,
            replyId,
            newReply.commentReplyId,
            previousCommentRepliesResponse,
          ),
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
  const { errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: deleteReply,
    onMutate: async (replyInfo: CommentReplyDeleteRequest) => {
      const { idCardId, commentId, commentReplyId } = replyInfo;

      await Promise.all([
        queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) }),
        queryClient.cancelQueries({
          queryKey: commentQueryKey.commentReplies(idCardId, commentId),
        }),
      ]);

      // update reply to target comment
      const previousCommentRepliesResponse = queryClient.getQueryData<CommentReplyGetResponse>(
        commentQueryKey.commentReplies(idCardId, commentId),
      );

      if (previousCommentRepliesResponse) {
        const updatedCommentReplies = removeReplyToComment(
          commentReplyId,
          commentId,
          previousCommentRepliesResponse.repliesInfo,
        );
        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, commentId),
          updatedCommentReplies,
        );
      }

      // update target comment's reply count
      const previousCommentsResponse = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );

      const updatedCommentsResponse = subtractReplyCountToPages(
        previousCommentsResponse,
        commentId,
      );
      queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedCommentsResponse);

      return { previousCommentsResponse, previousCommentRepliesResponse };
    },
    onError: (err, requestInfo, context) => {
      if (context) {
        const { previousCommentRepliesResponse, previousCommentsResponse } = context;
        const error = err as AxiosError;
        errorToast(error.message);
        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, requestInfo.commentId),
          previousCommentRepliesResponse,
        );
        queryClient.setQueryData(commentQueryKey.comments(idCardId), previousCommentsResponse);
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLikeComment,
    onMutate: async ({ idCardId, commentId }: CommentLikeRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });
      const previousCommentsResponse = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );
      if (previousCommentsResponse) {
        const updatedCommentsResponse = addLikeCommentToPages(previousCommentsResponse, commentId);
        queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedCommentsResponse);
      }
      return { idCardId, previousCommentsResponse };
    },
    onError: (err, requestInfo, context) => {
      if (context) {
        const { idCardId, previousCommentsResponse } = context as any; //FIXME: UseMutationOptions랑 사용했을 때 context의 타입추론이 안 됨

        queryClient.setQueryData(commentQueryKey.comments(idCardId), previousCommentsResponse);
      }
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLikeCommentReply,
    onMutate: async ({ idCardId, commentId, commentReplyId }: CommentReplyLikeRequest) => {
      await queryClient.cancelQueries({
        queryKey: commentQueryKey.commentReplies(idCardId, commentId),
      });
      const previousCommentRepliesResponse = queryClient.getQueryData<CommentReplyGetResponse>(
        commentQueryKey.commentReplies(idCardId, commentId),
      );
      if (previousCommentRepliesResponse) {
        const updatedCommentsResponse = addLikeReplyToComment(
          commentId,
          commentReplyId,
          previousCommentRepliesResponse,
        );
        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, commentId),
          updatedCommentsResponse,
        );
      }
      return { idCardId, commentId, previousCommentRepliesResponse };
    },
    onError: (err, requestInfo, context) => {
      if (context) {
        const { idCardId, commentId, previousCommentsResponse } = context as any; //FIXME: UseMutationOptions랑 사용했을 때 context의 타입추론이 안 됨

        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, commentId),
          previousCommentsResponse,
        );
      }
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentLike,
    onMutate: async ({ idCardId, commentId }: CommentLikeRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });
      const previousCommentsResponse = queryClient.getQueryData<CommentPages>(
        commentQueryKey.comments(idCardId),
      );
      if (previousCommentsResponse) {
        const updatedCommentsResponse = removeLikeCommentToPages(
          previousCommentsResponse,
          commentId,
        );
        queryClient.setQueryData(commentQueryKey.comments(idCardId), updatedCommentsResponse);
      }
      return { idCardId, previousCommentsResponse };
    },
    onError: (err, requestInfo, context) => {
      if (context) {
        const { idCardId, previousCommentsResponse } = context as any; //FIXME: UseMutationOptions랑 사용했을 때 context의 타입추론이 안 됨

        queryClient.setQueryData(commentQueryKey.comments(idCardId), previousCommentsResponse);
      }
    },
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommentReplyLike,
    onMutate: async ({ idCardId, commentId, commentReplyId }: CommentReplyLikeRequest) => {
      await queryClient.cancelQueries({
        queryKey: commentQueryKey.commentReplies(idCardId, commentId),
      });
      const previousCommentRepliesResponse = queryClient.getQueryData<CommentReplyGetResponse>(
        commentQueryKey.commentReplies(idCardId, commentId),
      );
      if (previousCommentRepliesResponse) {
        const updatedCommentsResponse = removeLikeReplyToComment(
          commentId,
          commentReplyId,
          previousCommentRepliesResponse,
        );
        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, commentId),
          updatedCommentsResponse,
        );
      }
      return { idCardId, commentId, previousCommentRepliesResponse };
    },
    onError: (err, requestInfo, context) => {
      if (context) {
        const { idCardId, commentId, previousCommentsResponse } = context as any; //FIXME: UseMutationOptions랑 사용했을 때 context의 타입추론이 안 됨

        queryClient.setQueryData(
          commentQueryKey.commentReplies(idCardId, commentId),
          previousCommentsResponse,
        );
      }
    },
    ...options,
  });
};

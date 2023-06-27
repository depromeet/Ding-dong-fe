import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import _ from 'lodash';

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
  CommentModel,
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

  return useMutation({
    mutationFn: (commentInfo: CommentPostRequest) => postCommentCreate(commentInfo),
    onMutate: async (commentInfo: CommentPostRequest) => {
      await queryClient.cancelQueries({ queryKey: commentQueryKey.comments(idCardId) });

      // 이전 댓글 목록을 가져옵니다.
      const previousComments = queryClient.getQueryData<CommentGetResponse>(
        commentQueryKey.comments(idCardId),
      );

      // 새로운 댓글 객체를 생성합니다.
      const newComment: CommentModel = {
        idCardId: idCardId,
        commentId: Date.now(), // 임시로 고유한 ID로 사용합니다.
        content: commentInfo.contents,
        createdAt: new Date().toISOString(),
        writerInfo: {
          userId: userInfo?.userId,
          nickname: userInfo?.nickname,
          profileImageUrl: userInfo?.profileImageUrl,
        },
        commentReplyLikeInfo: {
          likeCount: 0,
          isLikedByCurrentUser: false,
        },
        commentReplyInfos: [],
      };

      // 새로운 댓글을 이전 목록에 추가합니다.
      queryClient.setQueryData<InfiniteData<CommentGetResponse>>(
        commentQueryKey.comments(idCardId),
        oldData => {
          const copyoldData = _.cloneDeep(oldData);
          const newPages = copyoldData?.pages ?? [];
          if (newPages.length > 0) {
            const firstPage = newPages[0];
            const firstPageData = firstPage.data ?? {
              content: [],
              hasNext: false,
              page: 0,
              size: 0,
            };
            const updatedFirstPageData = {
              content: [{ ...newComment }, ...firstPageData.content],
              hasNext: firstPageData.hasNext,
              page: firstPageData.page,
              size: firstPageData.size,
            };
            newPages[0] = { ...firstPage, data: updatedFirstPageData };
          } else {
            newPages.push({
              data: {
                content: [{ ...newComment }],
                hasNext: false,
                page: 0,
                size: 10,
              },
            });
          }
          return {
            pages: newPages,
            pageParams: copyoldData?.pageParams ?? [],
          };
        },
      );

      return { previousComments };
    },
    onError: (err, newTodo, context) => {
      if (context?.previousComments) {
        // TODO: toast error
        queryClient.setQueryData(commentQueryKey.comments(idCardId), context.previousComments);
      }
    },
  });
};

export const deleteComment = ({ idCardId, commentId }: CommentDeleteRequest) =>
  privateApi.delete<CommentDeleteResponse>(`id-cards/${idCardId}/comments/${commentId}`);

export const useDeleteComment = (idCardId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentInfo: CommentDeleteRequest) => deleteComment(commentInfo),
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId)),
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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId)),
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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardId)),
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

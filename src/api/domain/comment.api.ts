import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import {
  CommentCountGetRequest,
  CommentCountGetResponse,
  CommentGetRequest,
  CommentGetResponse,
  CommentPostRequest,
  CommentPostResponse,
} from '~/types/comment';

export const commentQueryKey = {
  comments: (idCardsId: number, pageParam: number) => ['getComments', idCardsId, pageParam],
  commentCount: (idCardsId: number) => ['getCommentCounts', idCardsId],
};

export const getComments = ({ idCardsId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardsId}/comments?page=${pageParam}&size=10`);

export const useGetComments = ({ idCardsId, pageParam }: CommentGetRequest) => {
  return useInfiniteQuery(
    commentQueryKey.comments(idCardsId, pageParam),
    ({ pageParam = 0 }) => getComments({ idCardsId, pageParam }),
    {
      getNextPageParam: data => (!data.commentDto.hasNext ? data.commentDto.page + 1 : undefined),
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
    onSuccess: () => queryClient.invalidateQueries(commentQueryKey.comments(idCardsId, 0)),
  });
};

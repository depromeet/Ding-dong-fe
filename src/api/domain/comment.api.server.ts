import { privateApi } from '~/api/config/privateApi.server';
import {
  CommentCountGetRequest,
  CommentCountGetResponse,
  CommentGetRequest,
  CommentGetResponse,
} from '~/types/comment';

export const getCommentsServer = ({ idCardsId, pageParam }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardsId}/comments?page=${pageParam}&size=10`);

export const getCommentCountsServer = ({ idCardsId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardsId}/comments-count`);

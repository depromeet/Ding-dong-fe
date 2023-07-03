import { privateApi } from '~/api/config/privateApi.server';
import {
  CommentCountGetRequest,
  CommentCountGetResponse,
  CommentGetRequest,
  CommentGetResponse,
} from '~/types/comment';

export const getCommentsServer = ({ idCardId, pageParam = 0 }: CommentGetRequest) =>
  privateApi.get<CommentGetResponse>(`/id-cards/${idCardId}/comments?page=${pageParam}&size=10`);

export const getCommentCountsServer = ({ idCardId }: CommentCountGetRequest) =>
  privateApi.get<CommentCountGetResponse>(`/id-cards/${idCardId}/comments-count`);

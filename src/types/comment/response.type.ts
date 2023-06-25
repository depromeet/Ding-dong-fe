import { SliceResponse } from '~/types/api';
import { CommentModel } from '~/types/comment/model.type';

export type CommentGetResponse = {
  data: SliceResponse<CommentModel>;
};

export type CommentCountGetResponse = {
  count: number;
};

export type CommentPostResponse = {
  id: number;
};

export type CommentDeleteResponse = {
  id: number;
};

export type CommentPostReplyResponse = {
  id: number;
};

export type CommentDeleteReplyResponse = {
  id: number;
};

export type CommentLikePostResponse = {
  id: number;
};

export type CommentReplyLikePostResponse = {
  id: number;
};

export type CommentLikeCancelDeleteResponse = {
  id: number;
};

export type CommentReplyLikeCancelDeleteResponse = {
  id: number;
};

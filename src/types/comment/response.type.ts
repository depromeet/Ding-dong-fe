import { SliceResponse } from '~/types/api';
import { CommentModel, CommentReplyModel } from '~/types/comment/model.type';

export type CommentGetResponse = SliceResponse<CommentModel>;

export type CommentCountGetResponse = {
  count: number;
};

export type CommentReplyGetResponse = {
  commentId: number;
  repliesInfo: CommentReplyModel[];
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

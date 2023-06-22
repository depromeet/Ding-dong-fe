import { SliceResponse } from '~/types/api';
import { CommentModel } from '~/types/comment/model.type';

export type CommentGetResponse = {
  commentDto: SliceResponse<CommentModel>;
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

import { SliceResponse } from '~/types/api';
import { CommentModel } from '~/types/comment/model.type';

export type CommentGetResponse = {
  data: SliceResponse<CommentModel>;
};

export type CommentCountGetResponse = {
  count: number;
};

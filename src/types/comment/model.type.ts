export type CommentLikeModel = {
  likeCount: number;
  isLikedByCurrentUser: boolean;
};

export type CommentReplyModel = {
  commentReplyId: number;
  content: string;
  createdAt: string;
  commentReplyLikeInfo: CommentLikeModel;
};

export type CommentModel = {
  commentReplyId: number;
  content: string;
  createdAt: string;
  commentReplyLikeInfo: CommentLikeModel;
  commentReplyInfos: CommentReplyModel[];
};

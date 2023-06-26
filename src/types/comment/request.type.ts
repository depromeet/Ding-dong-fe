export type CommentGetRequest = {
  idCardId: number;
  pageParam: number;
};

export type CommentCountGetRequest = {
  idCardId: number;
};

export type CommentPostRequest = {
  idCardId: number;
  contents: string;
};

export type CommentPostReplyRequest = {
  idCardId: number;
  commentId: number;
  contents: string;
};

export type CommentDeleteRequest = {
  idCardId: number;
  commentId: number;
};

export type CommentReplyDeleteRequest = {
  idCardId: number;
  commentId: number;
  commentReplyId: number;
};

export type CommentLikeRequest = {
  idCardId: number;
  commentId: number;
};

export type CommentReplyLikeRequest = {
  idCardId: number;
  commentId: number;
  commentReplyId: number;
};

export type CommentLikeCancelRequest = {
  idCardId: number;
  commentId: number;
};

export type CommentReplyLikeCancelRequest = {
  idCardId: number;
  commentId: number;
  commentReplyId: number;
};

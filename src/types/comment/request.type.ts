export type CommentGetRequest = {
  idCardsId: number;
  pageParam: number;
};

export type CommentCountGetRequest = {
  idCardsId: number;
};

export type CommentPostRequest = {
  idCardsId: number;
  contents: string;
};

export type CommentPostReplyRequest = {
  idCardsId: number;
  commentId: number;
  contents: string;
};

export type CommentDeleteRequest = {
  idCardsId: number;
  commentId: number;
};

export type CommentReplyDeleteRequest = {
  idCardsId: number;
  commentId: number;
  commentReplyId: number;
};

export type CommentLikeRequest = {
  idCardsId: number;
  commentId: number;
};

export type CommentReplyLikeRequest = {
  idCardsId: number;
  commentId: number;
  commentReplyId: number;
};

export type CommentLikeCancelRequest = {
  idCardsId: number;
  commentId: number;
};

export type CommentReplyLikeCancelRequest = {
  idCardsId: number;
  commentId: number;
  commentReplyId: number;
};

export type CommentLikeModel = {
  likeCount: number;
  likedByCurrentUser: boolean;
};

export type CommentWriterIntoModel = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export type CommentModel = {
  idCardId: number;
  commentId: number;
  content: string;
  createdAt: string;
  writerInfo: CommentWriterIntoModel;
  commentLikeInfo: CommentLikeModel;
  repliesCount: number;
};

export type CommentReplyModel = {
  commentReplyId: number;
  content: string;
  createdAt: string;
  writerInfo: CommentWriterIntoModel;
  commentReplyLikeInfo: CommentLikeModel;
};

export type CommentLikeModel = {
  likeCount: number;
  isLikedByCurrentUser: boolean;
};

export type CommentWriterIntoModel = {
  userId: number;
  nickname: string;
  profileImageUrl: string;
};

export type CommentReplyModel = {
  commentReplyId: number;
  content: string;
  createdAt: string;
  commentReplyLikeInfo: CommentLikeModel;
};

export type CommentModel = {
  idCardId: number;
  commentId: number;
  content: string;
  createdAt: string;
  writerInfo: CommentWriterIntoModel;
  commentLikeInfo: CommentLikeModel;
  commentReplyInfos: CommentReplyModel[];
};

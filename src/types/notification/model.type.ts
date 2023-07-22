type CommentModel = {
  commentId: number;
  comment: string;
};

type CommunityModel = {
  communityId: number;
  communityName: string;
};

type IdCardModel = {
  idCardId: number;
};

type UserModel = {
  fromUserId: number;
  fromUserProfileImageUrl: string;
  fromUserNickname: string;
};

export type NotificationType =
  | 'ID_CARD_COMMENT'
  | 'COMMENT_REPLY'
  | 'COMMENT_LIKE'
  | 'COMMENT_REPLY_LIKE';
export type NotificationStatus = 'READ' | 'UNREAD';

export type NotificationModel = {
  notificationId: number;
  notificationType: NotificationType;
  notificationStatus: NotificationStatus;
  createdAt: string;
  communityDto: CommunityModel;
  idCardDto: IdCardModel;
  commentDto: CommentModel;
  userDto: UserModel;
};

export const NOTIFICATION_TYPE = {
  ID_CARD_COMMENT: '주민증',
  COMMENT_REPLY: '댓글',
  COMMENT_LIKE: '댓글',
  COMMENT_REPLY_LIKE: '답글',
};
export const NOTIFICATION_TYPE_ACTION = {
  ID_CARD_COMMENT: '에 댓글을 달았습니다',
  COMMENT_REPLY: '에 답글을 달았습니다',
  COMMENT_LIKE: '을 좋아합니다',
  COMMENT_REPLY_LIKE: '을 좋아합니다',
};

export type NotificationTitle = {
  title: string;
  id: number;
};

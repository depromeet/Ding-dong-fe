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

export type NotificationType = 'ID_CARD_COMMENT' | 'COMMENT_REPLY' | 'COMMENT_LIKE';
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

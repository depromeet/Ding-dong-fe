import { faker } from '@faker-js/faker';

import { NotificationModel } from '~/types/notification';

export const createCommunity = (idx: number): NotificationModel['communityDto'] => ({
  communityId: idx,
  communityName: faker.lorem.word(),
});

export const createIdCard = (idx: number): NotificationModel['idCardDto'] => ({
  idCardId: idx,
});

export const createComment = (idx: number): NotificationModel['commentDto'] => ({
  commentId: idx,
  comment: faker.lorem.paragraph(1),
});

export const createUser = (idx: number): NotificationModel['userDto'] => ({
  fromUserId: idx,
  fromUserProfileImageUrl: faker.image.avatar(),
  fromUserNickname: faker.person.fullName(),
});
export const createNotification = (idx: number): NotificationModel => {
  const today = new Date();
  return {
    notificationId: idx,
    notificationType:
      Math.random() > 0.7
        ? 'COMMENT_LIKE'
        : Math.random() > 0.5
        ? 'COMMENT_REPLY'
        : 'ID_CARD_COMMENT',
    notificationStatus: Math.random() > 0.5 ? 'READ' : 'UNREAD',
    createdAt: new Date(today.setDate(today.getDate() - idx)).toLocaleString(),
    communityDto: createCommunity(idx),
    idCardDto: createIdCard(idx),
    commentDto: createComment(idx),
    userDto: createUser(idx),
  };
};

export const createNotificationList = (n: number, page: number, size: number) => ({
  content: Array.from({ length: n }, (_, idx) => createNotification(idx)),
  page,
  size,
  hasNext: page === 5,
});

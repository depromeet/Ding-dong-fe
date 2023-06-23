import { commentMockHandler } from '~/mocks/comment/comment.mockHandler';
import { communityMockHandler } from '~/mocks/community/community.mockHandler';
import { idCardMockHandler } from '~/mocks/idCard/idCard.mockHandler';
import { notificationMockHandler } from '~/mocks/notification/notification.mockHandler';
import { userMockHandler } from '~/mocks/user/user.mockHandler';

const handlers = [
  ...idCardMockHandler,
  ...communityMockHandler,
  ...commentMockHandler,
  ...notificationMockHandler,
  ...userMockHandler,
];

export default handlers;

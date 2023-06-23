import { commentMockHandler } from '~/mocks/comment/comment.mockHandler';
import { communityMockHandler } from '~/mocks/community/community.mockHandler';
import { idCardMockHandler } from '~/mocks/idCard/idCard.mockHandler';

import { notificationMockHandler } from './notification/notification.mookHandler';

const handlers = [
  ...idCardMockHandler,
  ...communityMockHandler,
  ...commentMockHandler,
  ...notificationMockHandler,
];

export default handlers;

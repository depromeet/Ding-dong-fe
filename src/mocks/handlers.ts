import { commentMockHandler } from '~/mocks/comment/comment.mockHandler';
import { communityMockHandler } from '~/mocks/community/community.mockHandler';
import { idCardMockHandler } from '~/mocks/idCard/idCard.mockHandler';

import { characterMockHandler } from './user/user.mockHandler';

const handlers = [
  ...idCardMockHandler,
  ...communityMockHandler,
  ...commentMockHandler,
  ...characterMockHandler,
];

export default handlers;

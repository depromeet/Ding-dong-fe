import { commentMockHandler } from '~/mocks/comment/comment.mockHandler';
import { communityMockHandler } from '~/mocks/community/community.mockHandler';
import { idCardMockHandler } from '~/mocks/idCard/idCard.mockHandler';

const handlers = [...idCardMockHandler, ...communityMockHandler, ...commentMockHandler];

export default handlers;

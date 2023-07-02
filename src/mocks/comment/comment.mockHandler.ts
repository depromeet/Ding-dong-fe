import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import {
  createCommentCount,
  createCommentList,
  createRandomId,
} from '~/mocks/comment/comment.mock';
import { generateResponse } from '~/mocks/mock.util';

export const commentMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments?page=:page&size=10`, req => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    const idCardId = Number(req.url.pathname.split('/')[3]);
    return generateResponse({
      statusCode: 200,
      data: createCommentList(10, page, 10, idCardId),
    });
  }),
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments-count`, () => {
    return generateResponse({ statusCode: 200, data: createCommentCount() });
  }),
  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),

  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // DELETE reply
  rest.delete(
    `${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies/:commentReplyId`,
    () => {
      return generateResponse({ statusCode: 200, data: createRandomId() });
    },
  ),
  // POST Like
  rest.post(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/likes`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // POST reply Like
  rest.post(
    `${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies/:commentReplyId/reply-likes`,
    () => {
      return generateResponse({ statusCode: 200, data: createRandomId() });
    },
  ),
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/likes`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // DELETE reply Like
  rest.delete(
    `${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies/:commentReplyId/reply-likes`,
    () => {
      return generateResponse({ statusCode: 200, data: createRandomId() });
    },
  ),
];

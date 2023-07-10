import { faker } from '@faker-js/faker/locale/ko';
import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import {
  createCommentCount,
  createCommentList,
  createCommentReplyList,
  createRandomId,
} from '~/mocks/comment/comment.mock';
import { generateResponse } from '~/mocks/mock.util';

export const commentMockHandler = [
  // GET Comment
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments?page=:page&size=10`, req => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    const idCardId = Number(req.url.pathname.split('/')[3]);
    return generateResponse({
      statusCode: 200,
      data: createCommentList(10, page, 10, idCardId),
    });
  }),
  // GET Comment count
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comment-count`, () => {
    return generateResponse({ statusCode: 200, data: createCommentCount() });
  }),
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies`, req => {
    const commentId = Number(req.url.pathname.split('/')[5]);
    return generateResponse({
      statusCode: 200,
      data: {
        commentId,
        repliesInfo: createCommentReplyList(faker.number.int({ min: 0, max: 30 })),
      },
    });
  }),
  // POST comment
  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // DELETE comment
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // POST Reply
  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies`, () => {
    return generateResponse({ statusCode: 200, data: createRandomId() });
  }),
  // DELETE Reply
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

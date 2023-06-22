import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createCommentCount, createRandomCommentList } from '~/mocks/comment/comment.mock';

export const commentMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardsId/comments?page=:page&size=10`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    return res(
      ctx.status(200),
      ctx.json({
        commentDto: createRandomCommentList(10, page, 10),
      }),
    );
  }),
  rest.get(`${ROOT_API_URL}/id-cards/:idCardsId/comments-count`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createCommentCount()));
  }),
  rest.post(`${ROOT_API_URL}/id-cards/:idCardsId/comments`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
];

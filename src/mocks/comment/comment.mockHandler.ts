import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createCommentCount, createCommentList } from '~/mocks/comment/comment.mock';

export const commentMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardsId/comments?page=:page&size=10`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    return res(
      ctx.status(200),
      ctx.json({
        data: createCommentList(10, page, 10),
      }),
    );
  }),
  rest.get(`${ROOT_API_URL}/id-cards/:idCardsId/comments-count`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createCommentCount()));
  }),
];

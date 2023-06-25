import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createCommentCount, createCommentList } from '~/mocks/comment/comment.mock';

export const commentMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments?page=:page&size=10`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    const idCardId = Number(req.url.pathname.split('/')[2]);

    return res(
      ctx.status(200),
      ctx.json({
        data: createCommentList(10, page, 10, idCardId),
      }),
    );
  }),
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId/comments-count`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createCommentCount()));
  }),
  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  rest.post(`${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  rest.delete(
    `${ROOT_API_URL}/id-cards/:idCardId/comments/:commentId/replies/:commentReplyId`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 1 }));
    },
  ),
];

import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createCommentCount, createCommentList } from '~/mocks/comment/comment.mock';

export const commentMockHandler = [
  // GET comment List
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
  // GET comment count
  rest.get(`${ROOT_API_URL}/id-cards/:idCardsId/comments-count`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createCommentCount()));
  }),
  // POST comment
  rest.post(`${ROOT_API_URL}/id-cards/:idCardsId/comments`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  // DELETE comment
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  // POST reply
  rest.post(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  // DELETE reply
  rest.delete(
    `${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies/:commentReplyId`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 1 }));
    },
  ),
  // POST Like
  rest.post(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/likes`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  // POST reply Like
  rest.post(
    `${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies/:commentReplyId/reply-likes`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 1 }));
    },
  ),
  // DELETE Like
  rest.delete(`${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/likes`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),
  // DELETE reply Like
  rest.delete(
    `${ROOT_API_URL}/id-cards/:idCardsId/comments/:commentId/replies/:commentReplyId/reply-likes`,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ id: 1 }));
    },
  ),
];

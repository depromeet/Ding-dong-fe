import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';

export const characterMockHandler = [
  rest.post(`${ROOT_API_URL}/character`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

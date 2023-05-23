import { rest } from 'msw';

import { createTester } from './user.mock';

const userMockHandler = [
  rest.get('/api/tester', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ tester: createTester() }));
  }),
];

export default userMockHandler;

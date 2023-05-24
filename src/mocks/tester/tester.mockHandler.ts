import { rest } from 'msw';

import { REQUEST_API, ROOT_API_URL } from '@/lib/api/config/requestUrl';

import { createTester } from './tester.mock';

const testerMockHandler = [
  rest.get(ROOT_API_URL + REQUEST_API.TESTER, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ tester: createTester() }));
  }),
];

export default testerMockHandler;

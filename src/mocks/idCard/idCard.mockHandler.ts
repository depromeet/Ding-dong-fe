import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';

export const idCardMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: idCardDetailMock() }));
  }),
];

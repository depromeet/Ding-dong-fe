import { rest } from 'msw';

import { REQUEST_API, ROOT_API_URL } from '~/api/config/requestUrl';
import { createIdCard } from '~/mocks/idCard/idCard.mock';

const idCardMockHandler = [
  // GET: api/id-cards/{idCardsId}
  rest.get(`${ROOT_API_URL}${REQUEST_API.IDCARD.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: createIdCard() }));
  }),
];

export default idCardMockHandler;

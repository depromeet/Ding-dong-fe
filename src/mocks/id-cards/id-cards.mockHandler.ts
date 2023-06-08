import { rest } from 'msw';

import { REQUEST_API, ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { createIdCard } from '@/mocks/id-cards/id-cards.mock';

const idCardsMockHandler = [
  // GET: api/id-cards/{idCardsId}
  rest.get(`${ROOT_API_URL}${REQUEST_API.IDCARDS.DETAIL}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: createIdCard() }));
  }),
];

export default idCardsMockHandler;

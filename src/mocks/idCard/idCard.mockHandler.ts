import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createIdCardMock, idCardDetailMock } from '~/mocks/idCard/idCard.mock';

export const idCardMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: idCardDetailMock() }));
  }),
  rest.get(`${ROOT_API_URL}/communities/:communityId/users/idCards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ idCardDetailsDto: idCardDetailMock() }));
  }),
  rest.put(`${ROOT_API_URL}/id-cards/:idCardId`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(idCardDetailMock()));
  }),
  rest.post(`${ROOT_API_URL}/id-cards`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(createIdCardMock));
  }),
];

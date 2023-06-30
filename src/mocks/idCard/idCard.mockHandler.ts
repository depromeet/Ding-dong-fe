import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createIdCardMock, idCardDetailMock } from '~/mocks/idCard/idCard.mock';
import { generateResponse } from '~/mocks/mock.util';

export const idCardMockHandler = [
  rest.get(`${ROOT_API_URL}/id-cards/:idCardId`, () => {
    return generateResponse({ statusCode: 200, data: { idCardDetailsDto: idCardDetailMock() } });
  }),
  rest.get(`${ROOT_API_URL}/communities/:communityId/users/idCards`, () => {
    return generateResponse({ statusCode: 200, data: { idCardDetailsDto: idCardDetailMock() } });
  }),
  rest.put(`${ROOT_API_URL}/id-cards/:idCardId`, () => {
    return generateResponse({ statusCode: 200, data: idCardDetailMock() });
  }),
  rest.post(`${ROOT_API_URL}/id-cards`, () => {
    return generateResponse({ statusCode: 200, data: createIdCardMock });
  }),
];

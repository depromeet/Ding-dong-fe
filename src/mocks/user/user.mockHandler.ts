import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { generateResponse } from '~/mocks/mock.util';
import { createUserInfo } from '~/mocks/user/user.mock';

export const userMockHandler = [
  rest.get(`${ROOT_API_URL}/user/profile`, () => {
    return generateResponse({ statusCode: 200, data: createUserInfo() });
  }),
  rest.post(`${ROOT_API_URL}/user/character`, () => {
    return generateResponse({ statusCode: 200, data: {} });
  }),
];

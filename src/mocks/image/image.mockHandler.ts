import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { generateResponse } from '~/mocks/mock.util';

import { imageUrlMock } from './image.mock';

export const imageMockHandler = [
  rest.post(`${ROOT_API_URL}/images`, () => {
    return generateResponse({ statusCode: 200, data: imageUrlMock });
  }),
];

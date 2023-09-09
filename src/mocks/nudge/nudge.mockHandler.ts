import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { generateResponse } from '~/mocks/mock.util';
import { createNudgeList } from '~/mocks/nudge/nudge.mock';

export const nudgeMockHandler = [
  rest.get(`${ROOT_API_URL}/nudges/id-cards/:idCardsId`, () => {
    return generateResponse({ statusCode: 200, data: { nudgeInfoDtos: createNudgeList() } });
  }),
];

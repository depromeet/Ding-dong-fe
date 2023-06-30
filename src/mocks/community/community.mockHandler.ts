import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import {
  createCommunityDetail,
  createCommunityIdCards,
  createCommunityList,
} from '~/mocks/community/community.mock';
import { generateResponse } from '~/mocks/mock.util';

export const communityMockHandler = [
  rest.get(`${ROOT_API_URL}/communities/:communityId/idCards?page=:page&size=10`, req => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    return generateResponse({
      statusCode: 200,
      data: { communityIdCardsDtos: createCommunityIdCards(10, page, 10) },
    });
  }),

  rest.get(`${ROOT_API_URL}/communities/:communityId`, () => {
    return generateResponse({
      statusCode: 200,
      data: { communityDetailsDto: createCommunityDetail() },
    });
  }),

  rest.get(`${ROOT_API_URL}/communities/users/:userId`, () => {
    return generateResponse({
      statusCode: 200,
      data: { communityListDtos: createCommunityList() },
    });
  }),
];

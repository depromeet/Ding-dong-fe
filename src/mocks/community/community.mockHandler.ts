import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { createCommunityDetail, createCommunityIdCards } from '~/mocks/community/community.mock';

const communityMockHandler = [
  rest.get(`${ROOT_API_URL}/communities/:id/idCards?page=:page&size=10`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));

    return res(
      ctx.status(200),
      ctx.json({
        communityIdCardsDtos: createCommunityIdCards(10, page, 10),
      }),
    );
  }),

  rest.get(`${ROOT_API_URL}/communities/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ communityDetailsDto: createCommunityDetail() }));
  }),
];

export default communityMockHandler;

import { rest } from 'msw';

import { REQUEST_API, ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { createCommunityDetail, createCommunityIdCards } from '@/mocks/community/community.mock';

const communityMockHandler = [
  // GET: api/communities/1/idCards
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
  rest.get(`${ROOT_API_URL}${REQUEST_API.COMMUNITINY.INDEX}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ communityDetailsDto: createCommunityDetail() }));
  }),
];

export default communityMockHandler;

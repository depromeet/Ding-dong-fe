import { rest } from 'msw';

import { ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { createCommunityIdCards } from '@/mocks/community/community.mock';

const communityMockHandler = [
  // GET: api/communities/[id]/idCards
  rest.get(`${ROOT_API_URL}/communities/:id/idCards`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    const size = Number(searchParams.get('size'));

    return res(
      ctx.status(200),
      ctx.json({
        communityIdCardDtos: createCommunityIdCards(10, page, size),
      }),
    );
  }),
];

export default communityMockHandler;

import { rest } from 'msw';

import { REQUEST_API, ROOT_API_URL } from '@/lib/api/config/requestUrl';
import { createCommunities } from '@/mocks/community/community.mock';

const communityMockHandler = [
  // GET: api/communities/users/{userId}
  rest.get(`${ROOT_API_URL}${REQUEST_API.COMMUNITINY.USERS}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ communityListDtos: createCommunities(3) }));
  }),
];

export default communityMockHandler;

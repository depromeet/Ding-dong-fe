import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';

import { createNotificationList } from './notification.mock';

export const notificationMockHandler = [
  rest.get(`${ROOT_API_URL}/notifications?page=:page&size=10`, (req, res, ctx) => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    return res(
      ctx.status(200),
      ctx.json({
        data: createNotificationList(10, page, 10),
      }),
    );
  }),
];

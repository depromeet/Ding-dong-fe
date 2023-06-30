import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';
import { generateResponse } from '~/mocks/mock.util';

import { createNotificationList } from './notification.mock';

export const notificationMockHandler = [
  rest.get(`${ROOT_API_URL}/notifications?page=:page&size=10`, req => {
    const { searchParams } = req.url;
    const page = Number(searchParams.get('page'));
    return generateResponse({
      statusCode: 200,
      data: { data: createNotificationList(10, page, 10) },
    });
  }),
];

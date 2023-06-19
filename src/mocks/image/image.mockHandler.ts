import { rest } from 'msw';

import { ROOT_API_URL } from '~/api/config/requestUrl';

import { imageUrlMock } from './image.mock';

export const ImageUrlMockHandler = rest.post(`${ROOT_API_URL}/images`, (req, res, ctx) =>
  res(ctx.status(200), ctx.json(imageUrlMock)),
);

export const imageMockHandler = [ImageUrlMockHandler];

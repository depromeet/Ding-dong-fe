import { context, response } from 'msw';

import { DefaultServerResponseType } from '~/api/config/api.types';

export const generateResponse = ({
  data,
  statusCode,
  delay = 0,
}: Omit<DefaultServerResponseType, 'success'> & { delay?: number }) => {
  const isSuccess = statusCode < 400;
  return response(
    context.status(200),
    context.delay(delay),
    context.json({
      data,
      statusCode,
      success: isSuccess,
    }),
  );
};

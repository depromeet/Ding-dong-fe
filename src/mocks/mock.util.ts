import { context, response } from 'msw';

import { DefaultServerResponseType } from '~/api/config/api.types';

export const generateResponse = <DataType>({
  data,
  statusCode,
  delay = 0,
}: Omit<DefaultServerResponseType<DataType>, 'success'> & { delay?: number }) => {
  const isSuccess = statusCode < 400;
  return response(
    context.status(statusCode),
    context.delay(delay),
    context.json({
      data,
      statusCode,
      success: isSuccess,
    }),
  );
};

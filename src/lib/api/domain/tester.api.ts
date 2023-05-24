import { BaseResponseType } from '@/lib/api/config/api.types';
import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';

const testerApi = {
  getTester: () =>
    publicApi.get<BaseResponseType<{ tester: { id: string; nickname: string } }>>(
      REQUEST_API.TESTER,
    ),
};

export default testerApi;

import publicApi from '@/lib/api/config/publicApi';
import { REQUEST_API } from '@/lib/api/config/requestUrl';

const testerApi = {
  getTester: () => publicApi.get<{ tester: { id: string; nickname: string } }>(REQUEST_API.TESTER),
};

export default testerApi;

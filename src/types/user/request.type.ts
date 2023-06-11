// user.d.ts 정리 후 절대경로 적용
import { UserInfoResponse } from './response.type';

export type UserInfoRequest = Omit<UserInfoResponse, 'userId'>;

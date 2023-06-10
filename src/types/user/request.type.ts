// user.d.ts 정리 후 절대경로 적용
import { UserInfoResponseType } from './response.type';

export type UserInfoRequestType = Omit<UserInfoResponseType, 'userId'>;

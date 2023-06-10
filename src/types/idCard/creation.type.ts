import { CreateIdCardRequestType } from '@/types/idCard/request.type';

export type Steps = 'BOARDING' | 'PROFILE' | 'KEYWORD' | 'KEYWORD_CONTENT' | 'COMPLETE';

// id field 추가할 예정입니다
export type IdCardCreationFormType = CreateIdCardRequestType;

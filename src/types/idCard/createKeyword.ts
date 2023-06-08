import { Keyword } from '@/types/idCard';

export type CreateKeyword = Omit<Keyword, 'keywordId'>;

import { faker } from '@faker-js/faker/locale/ko';

import { SliceResponse } from '@/types/api';
import { CommunityDetailModel, CommunityIdCardsModel } from '@/types/community';

export const createCommunityIdCard = (idx: number): CommunityIdCardsModel => ({
  idCardId: idx,
  nickname: faker.person.fullName(),
  aboutMe: faker.lorem.paragraph(),
  characterType: faker.helpers.arrayElement(['TRUE', 'PIPI', 'TOBBY', 'BUDDY']),
  keywordTitles: faker.helpers.arrayElements(
    [
      '르세라핌 최고',
      '엽떡',
      '디프만 12기',
      '디프만 운영진',
      'FE 3년차',
      '디자이너',
      '축구',
      '피파',
      '백엔드',
    ],
    3,
  ),
});

export const createCommunityIdCards = (
  n: number,
  page: number,
  size: number,
): SliceResponse<CommunityIdCardsModel> => ({
  content: Array.from({ length: n }, (_, idx) => createCommunityIdCard(idx)),
  page,
  size,
  hasNext: page === 5,
});

export const createCommunityDetail = (): CommunityDetailModel => ({
  communityId: 1,
  logoImageUrl: faker.image.avatar(),
  coverImageUrl: faker.image.avatar(),
  title: faker.lorem.sentence(),
  idCardCount: faker.number.int(),
  description: faker.lorem.paragraph(),
});

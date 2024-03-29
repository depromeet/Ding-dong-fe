import { faker } from '@faker-js/faker/locale/ko';

import { generateRandomNudge } from '~/mocks/nudge.util';
import { SliceResponse } from '~/types/api';
import { CommunityDetailModel, CommunityIdCardsModel, CommunityListModel } from '~/types/community';

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
  commentCount: faker.number.int({ min: 0, max: 999 }),
  profileImageUrl: faker.image.avatar(),
  toNudgeType: generateRandomNudge(),
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
  userCount: faker.number.int(),
  description: faker.lorem.lines(2),
  invitationCode: '123#aa',
});

export const createCommunityList = (): CommunityListModel[] => {
  return Array.from({ length: 2 }, () => ({
    communityId: faker.number.int(),
    logoImageUrl: faker.image.avatar(),
    title: faker.string.alphanumeric(5),
    userCount: faker.number.int(),
  }));
};

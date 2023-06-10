import { faker } from '@faker-js/faker/locale/ko';

import { CommunitySummaryType } from '@/types/community';

export const createCommunity = (idx: number): CommunitySummaryType => ({
  communityId: idx,
  logoImageUrl: faker.image.avatar(),
  coverImageUrl: faker.image.avatar(),
  title: faker.lorem.sentence(),
  idCardCount: faker.number.int(),
  description: faker.lorem.paragraph(),
});

export const createCommunities = (n: number) =>
  Array.from({ length: n }, (_, idx) => createCommunity(idx));

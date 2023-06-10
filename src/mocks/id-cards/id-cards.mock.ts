import { faker } from '@faker-js/faker/locale/ko';

import { IdCardType } from '@/types/id-cards.type';

export const createIdCard = (): IdCardType => ({
  idCardId: faker.string.uuid(),
  nickname: faker.person.fullName(),
  profileImageUrl: faker.image.avatar(),
  aboutMe: faker.lorem.paragraph(),
  keywords: Array.from({ length: 3 }, () => ({
    keywordId: faker.number.int(),
    title: faker.lorem.word(),
    imageUrl: faker.image.avatar(),
    content: faker.lorem.paragraph(),
  })),
  characterType: faker.helpers.arrayElement(['TRUE', 'PIPI', 'TOBBY', 'BUDDY']),
});

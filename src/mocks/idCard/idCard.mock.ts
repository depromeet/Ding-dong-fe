import { faker } from '@faker-js/faker/locale/ko';

import { IdCardCreateResponse, IdCardDetailModel } from '~/types/idCard';

export const idCardDetailMock = (): IdCardDetailModel => ({
  idCardId: faker.number.int(),
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

export const createIdCardMock: IdCardCreateResponse = { id: 1 };

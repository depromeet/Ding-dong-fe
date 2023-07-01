import { faker } from '@faker-js/faker/locale/ko';

import { UserInfoModel } from '~/types/user';

export const createUserInfo = (): UserInfoModel => ({
  userId: faker.number.int(),
  email: faker.internet.email(),
  nickname: faker.person.fullName(),
  gender: faker.person.gender(),
  ageRange: '',
  profileImageUrl: faker.image.avatar(),
  characterType: 'BUDDY',
  communityIds: [1],
});

import { faker } from '@faker-js/faker/locale/ko';

import { NudgeListModel } from '~/types/nudge/model.type';

export const createNudgeList = (): NudgeListModel[] => {
  return Array.from({ length: 5 }, () => ({
    nudgeId: faker.number.int(),
    opponentUser: {
      userId: faker.number.int(),
      profileImageUrl: faker.image.avatar(),
      nickname: faker.person.fullName(),
    },
    toUserNudgeType: faker.helpers.arrayElement([
      'FRIENDLY',
      'SIMILARITY',
      'TALKING',
      'MEET',
      null,
    ]),
    fromUserNudgeType: faker.helpers.arrayElement([
      'FRIENDLY',
      'SIMILARITY',
      'TALKING',
      'MEET',
      null,
    ]),
  }));
};

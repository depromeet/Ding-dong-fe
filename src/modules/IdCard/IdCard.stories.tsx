import { faker } from '@faker-js/faker/locale/ko';
import type { Meta, StoryObj } from '@storybook/react';

import { IdCard } from './IdCard.client';

const meta: Meta<typeof IdCard> = {
  title: 'modules/IdCard',
  component: IdCard,
};

type Story = StoryObj<typeof IdCard>;

export const Default: Story = {
  render: () => (
    <IdCard
      profileImageUrl={faker.image.avatar()}
      idCardId={1}
      aboutMe="안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!"
      nickname="이트루"
      characterType="TRUE"
      keywordTitles={['엽기떡기', '르세라핌', 'FE', 'EPL']}
      commentCount={faker.number.int({ min: 0, max: 999 })}
      toNudgeType="FRIENDLY"
    />
  ),
};

export const Tobby: Story = {
  render: () => (
    <IdCard
      profileImageUrl={faker.image.avatar()}
      idCardId={1}
      aboutMe="안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!"
      nickname="유토비"
      characterType="TOBBY"
      commentCount={faker.number.int({ min: 0, max: 999 })}
      keywordTitles={[
        '엽기떡기 시키기',
        '르세라핌 최고',
        '뉴진스가 더 최고',
        'FE 3년차',
        '맛집 추천 받아요',
        '코딩하는게 취미',
        '퐁퐁퐁퐁퐁',
      ]}
      toNudgeType="FRIENDLY"
    />
  ),
};

export const Buddy: Story = {
  render: () => (
    <IdCard
      profileImageUrl={faker.image.avatar()}
      idCardId={1}
      aboutMe="안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!"
      nickname="박버디"
      characterType="BUDDY"
      keywordTitles={['엽기떡기', '르세라핌', 'FE', 'EPL']}
      commentCount={faker.number.int({ min: 0, max: 999 })}
      toNudgeType="FRIENDLY"
    />
  ),
};

export const Pipi: Story = {
  render: () => (
    <IdCard
      profileImageUrl={faker.image.avatar()}
      idCardId={1}
      aboutMe="안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!"
      nickname="김피피"
      characterType="PIPI"
      keywordTitles={['엽기떡기', '르세라핌', 'FE', 'EPL']}
      commentCount={faker.number.int({ min: 0, max: 999 })}
      toNudgeType="FRIENDLY"
    />
  ),
};

export default meta;

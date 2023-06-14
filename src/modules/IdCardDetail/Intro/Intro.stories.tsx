import type { Meta, StoryObj } from '@storybook/react';

import { Intro } from './Intro';

const meta: Meta<typeof Intro> = {
  title: 'Intro',
  component: Intro,
};

type Story = StoryObj<typeof Intro>;

export const Default: Story = {
  render: () => (
    <Intro
      aboutMe="안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!"
      nickname="이트루"
      characterType="TRUE"
      keywords={[
        { keywordId: 1, title: '엽기떡기', imageUrl: '', content: '' },
        { keywordId: 1, title: 'FE 신입', imageUrl: '', content: '' },
        { keywordId: 1, title: '르세라핌 최고', imageUrl: '', content: '' },
      ]}
    />
  ),
};

export default meta;

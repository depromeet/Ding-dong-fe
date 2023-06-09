import type { Meta, StoryObj } from '@storybook/react';

import Button from '@/components/Button/Button';
import { IdCard } from '@/modules/IdCard/IdCard.client';

import { CompleteStep } from './CompleteStep.client';

const meta: Meta<typeof CompleteStep> = {
  title: 'CompleteStep',
  component: CompleteStep,
};

type Story = StoryObj<typeof CompleteStep>;

export const Default: Story = {
  render: () => (
    <div>
      <p className="text-h2 text-grey-900">
        {'짜잔!'}
        {/**타이틀 자리 */}
      </p>
      <p className="pb-24px text-h2 text-grey-900">{'주민증이 발급되었어요!'}</p>
      <IdCard
        idCardId={2}
        aboutMe={'안녕하세요 저는 N년차 개발자구요 :) 너무 보고싶었어요 다들 잘부탁드립니다!'}
        keywordTitles={['엽기떡기', '르세라핌', 'FE', 'EPL']}
        nickname={'유토비'}
        characterType={'TOBBY'}
      />
      <p className="my-52px w-full text-center text-b1 text-primary-500">
        {'주민증을 눌러보세요!'}
      </p>
      <Button size="large" color="primary">
        {'행성 방문하기'}
      </Button>
    </div>
  ),
};

export default meta;

import type { Meta, StoryObj } from '@storybook/react';

import { CommunitySummary } from './CommunitySummary.server';

const meta: Meta<typeof CommunitySummary> = {
  title: 'CommunitySummary',
  component: CommunitySummary,
};

type Story = StoryObj<typeof CommunitySummary>;

export const Default: Story = {
  render: () => (
    <CommunitySummary
      communityId={1}
      coverImageUrl={'/assets/images/planet-with-shadow.png'}
      logoImageUrl={'/assets/images/pipi.png'}
      title={'Depromeet'}
      idCardCount={22}
      description={
        '디프만은 디자이너와 개발자가기획부터 론칭까지 함께 경험하는 성장추구형 커뮤니티입니다'
      }
    />
  ),
};

export default meta;

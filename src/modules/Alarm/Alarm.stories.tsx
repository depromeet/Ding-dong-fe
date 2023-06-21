import { Meta, StoryObj } from '@storybook/react';

import { AlarmTab } from './AlarmTab.client';

const meta: Meta<typeof AlarmTab> = {
  title: 'modules/AlarmTab',
  component: AlarmTab,
};

export default meta;

export const AlarmTabStory: StoryObj<typeof AlarmTab> = {
  render: () => (
    <AlarmTab
      communities={[
        {
          communityId: 1,
          title: '디프만',
          logoImageUrl: '/assets/images/pipi.png',
          hasNewAlarm: true,
        },
        {
          communityId: 2,
          title: '디프만22',
          logoImageUrl: '/assets/images/pipi.png',
          hasNewAlarm: false,
        },
      ]}
    />
  ),
};

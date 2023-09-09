/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '~/components/Button';
import { nudgeMessages } from '~/types/nudge';

import { SpeechBubble } from './index';

const meta: Meta<typeof SpeechBubble> = {
  title: 'components/SpeechBubble',
  component: SpeechBubble.Detail,
  args: {},
};

export default meta;

type Story = StoryObj<typeof SpeechBubble>;

export const Detail: Story = {
  render: () => <SpeechBubble.Detail />,
};

export const Thumbnail: Story = {
  render: () => {
    const [index, setIndex] = useState(0);
    const onClickChangeNudgeType = () => {
      setIndex(prev => (prev + 1 === 4 ? 0 : prev + 1));
    };

    return (
      <div className="flex flex-col gap-20pxr">
        <SpeechBubble.Thumbnail nudgeType={nudgeMessages[index].id} />
        <Button size="small" color="primary" onClick={onClickChangeNudgeType}>
          콕 찌르기 타입 변경
        </Button>
      </div>
    );
  },
};

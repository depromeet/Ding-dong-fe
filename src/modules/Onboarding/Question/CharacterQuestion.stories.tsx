import type { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';

import { CharacterQuestion } from './CharacterQuestion';

const meta: Meta<typeof CharacterQuestion> = {
  title: 'modules/CharacterQuestion',
  component: CharacterQuestion,
  args: {},
};

export default meta;

type Story = StoryObj<typeof CharacterQuestion>;

export const Default: Story = {
  args: {
    title: '홀로 우주 패키지 여행을\n 가게 되었다',
    image: '/assets/images/onboarding-question-ticket.png',
    firstOption: { fieldValue: 'E', content: '옆자리에 앉은 사람에게 말을 건다.' },
    secondOption: { fieldValue: 'I', content: '풍경을 보며 나만의 시간을 즐긴다.' },
    onQuestionButtonClick: (e: MouseEvent<HTMLButtonElement>) => console.log(e.currentTarget.name),
  },
};

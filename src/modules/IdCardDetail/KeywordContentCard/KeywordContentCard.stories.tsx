import type { Meta, StoryObj } from '@storybook/react';

import { KeywordContentCard } from './KeywordContentCard.server';

const meta: Meta<typeof KeywordContentCard> = {
  title: 'modules/KeywordContentCard',
  component: KeywordContentCard,
};

type Story = StoryObj<typeof KeywordContentCard>;

export const Default: Story = {
  render: () => (
    <KeywordContentCard
      title="Hurt"
      image={null}
      content="보고 싶은 생각에 들어간 우리 창에 나는 말을 거는데보내지는 않을래 느린 한마디보다 조용함이 더 좋아 기다리고 있지만 매일 이런 건 아냐 난 재미없어~ 게임 같은 건 다 필요 없어 아무리 좋아도 널 no"
    />
  ),
};

export default meta;

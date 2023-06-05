import type { Meta, StoryObj } from '@storybook/react';

import KeywordInput from './KeywordInput';

const meta: Meta<typeof KeywordInput> = {
  title: 'CATEGORY/KeywordInput',
  component: KeywordInput,
  args: {},
};

export default meta;

type Story = StoryObj<typeof KeywordInput>;

export const Primary: Story = {
  render: () => <KeywordInput />,
};

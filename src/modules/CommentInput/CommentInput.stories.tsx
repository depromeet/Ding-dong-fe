import type { Meta, StoryObj } from '@storybook/react';

import { CommentInput } from '~/modules/CommentInput/CommentInput.client';

const meta: Meta<typeof CommentInput> = {
  title: 'modules/CommentInput',
  component: CommentInput,
};

type Story = StoryObj<typeof CommentInput>;

export const Default: Story = {
  render: () => <CommentInput communityId={2} idCardId={1} />,
};

export default meta;

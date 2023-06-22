import type { Meta, StoryObj } from '@storybook/react';

import { createComment } from '~/mocks/comment/comment.mock';

import { Comment } from './index';

const meta: Meta<typeof Comment> = {
  title: 'modules/Comment',
  component: Comment,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Comment>;

const MOCK_COMMENT = createComment(123);

export const Primary: Story = {
  render: () => <Comment {...MOCK_COMMENT} />,
};

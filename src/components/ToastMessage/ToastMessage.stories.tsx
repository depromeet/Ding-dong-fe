/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '~/components/Button';
import { useToastMessageStore } from '~/stores/toastMessage.store';

import { ToastMessage, ToastMessageProvider } from './index';

const meta: Meta<typeof ToastMessage> = {
  title: 'components/ToastMessage',
  component: ToastMessage,
  args: {},
};

export default meta;

type Story = StoryObj<typeof ToastMessage>;

export const Primary: Story = {
  render: () => <ToastMessage message="문제가 발생했습니다. 다시 한 번 시도해주세요." />,
};

export const ToastMessageUsage: Story = {
  render: () => {
    const { fireToast } = useToastMessageStore();

    return (
      <div>
        <Button
          onClick={() => fireToast('에러 알람?')}
          type="button"
          size="medium"
          color="primary"
          className="mt-t-nav"
        >
          토스트 메시지 추가하기
        </Button>
        <ToastMessageProvider />
      </div>
    );
  },
};

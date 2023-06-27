import { create } from 'zustand';

type ReplyRecipient = {
  nickname: string | undefined;
  commentId: number | undefined;
  setReplyRecipient: (nickname: string, commentId: number) => void;
};

export const useReplyRecipientStore = create<ReplyRecipient>()(set => ({
  nickname: undefined,
  commentId: undefined,
  setReplyRecipient: (nickname: string, commentId: number) => {
    set(() => ({
      nickname: nickname,
      commentId: commentId,
    }));
  },
}));

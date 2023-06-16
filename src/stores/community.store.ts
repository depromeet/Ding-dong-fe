import { create } from 'zustand';

type Store = {
  communityTitle: string | undefined;
  setCommunityTitle: (title: string) => void;
};

export const useCommunityStore = create<Store>()(set => ({
  communityTitle: undefined,
  setCommunityTitle: (title: string) => {
    set(() => ({ communityTitle: title }));
  },
}));

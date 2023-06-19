import { create } from 'zustand';

type Store = {
  communityTitle: string | undefined;
  communityId: number | undefined;
  switchCommunity: (title: string, id: number) => void;
};

export const useCommunityStore = create<Store>()(set => ({
  communityTitle: undefined,
  communityId: undefined,
  switchCommunity: (title: string, id: number) => {
    set(() => ({
      communityTitle: title,
      communityId: id,
    }));
  },
}));

import { create } from 'zustand';

type Store = {
  communityId: number;
  switchCommunity: (id: number) => void;
};

export const useCommunityStore = create<Store>()(set => ({
  communityId: -1,
  switchCommunity: (id: number) => {
    document.cookie = `communityId=${id}`;
    set(() => ({
      communityId: id,
    }));
  },
}));

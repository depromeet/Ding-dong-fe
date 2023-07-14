import { create } from 'zustand';

type Store = {
  communityId: number;
  switchCommunity: (id: number) => void;
  isInitPlanetId: () => boolean;
};
const INIT_PLANET_ID = -1;

export const useCommunityStore = create<Store>()((set, get) => ({
  communityId: INIT_PLANET_ID,
  switchCommunity: (id: number) => {
    document.cookie = `communityId=${id}`;
    set(() => ({
      communityId: id,
    }));
  },
  isInitPlanetId: () => {
    return get().communityId === INIT_PLANET_ID;
  },
}));

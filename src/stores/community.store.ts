import { create } from 'zustand';

import { DINGDONG_PLANET } from '~/utils/variable';

type Store = {
  communityId: number;
  switchCommunity: (id: number) => void;
  isInitPlanetId: () => boolean;
};

export const useCommunityStore = create<Store>()((set, get) => ({
  communityId: DINGDONG_PLANET.DINGDONG_PLANET_ID,
  switchCommunity: (id: number) => {
    document.cookie = `communityId=${id}`;
    set(() => ({
      communityId: id,
    }));
  },
  isInitPlanetId: () => {
    return get().communityId === DINGDONG_PLANET.DINGDONG_PLANET_ID;
  },
}));

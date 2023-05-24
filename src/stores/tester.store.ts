import { create } from 'zustand';

type TesterState = {
  id: string;
  nickname: string;
};

type TesterAction = {
  setTesterInfo: (id: string, nickname: string) => void;
};

const useTesterStore = create<TesterState & TesterAction>()(set => ({
  id: '1',
  nickname: 'zustand not Yet',
  setTesterInfo: (id: string, nickname: string) => set(() => ({ id, nickname })),
}));

export default useTesterStore;

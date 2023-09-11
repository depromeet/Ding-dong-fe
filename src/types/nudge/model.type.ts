export type NudgeModel = 'FRIENDLY' | 'SIMILARITY' | 'TALKING' | 'MEET';

export type NudgeListModel = {
  nudgeId: number;
  opponentUser: {
    userId: number;
    profileImageUrl: string;
    nickname: string;
  };
  toUserNudgeType: NudgeModel;
  fromUserNudgeType: NudgeModel | null;
};

export type NudgeIconSelectorType = 'DEFAULT' | NudgeModel;

export type NudgeMessagesType = { text: string; id: NudgeModel }[];

export const nudgeMessages: NudgeMessagesType = [
  {
    id: 'MEET',
    text: '만나서 반가워요',
  },
  {
    id: 'FRIENDLY',
    text: '친해지고 싶어요',
  },
  {
    id: 'SIMILARITY',
    text: '저와 비슷해요',
  },
  {
    id: 'TALKING',
    text: '같이 밥 한끼 해요',
  },
];

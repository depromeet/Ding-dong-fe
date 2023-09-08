type NudgeType = 'FRIENDLY' | 'SIMILARITY' | 'TALKING' | 'MEET';
export type NudgeListModel = {
  nudgeId: number;
  opponentUser: {
    userId: number;
    profileImageUrl: string;
    nickname: string;
  };
  toUserNudgeType: NudgeType | null;
  fromUserNudgeType: NudgeType | null;
};

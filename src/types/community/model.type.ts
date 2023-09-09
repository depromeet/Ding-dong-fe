import { CharacterNameModel, IdCardDetailModel } from '~/types/idCard';
import { NudgeModel } from '~/types/nudge';

// FIXME: 아래 타입 어디서 사용하죠? 아무대서도 사용 안하는 것 같은뎁
export type CommunityIdCardSummaryModel = Omit<IdCardDetailModel, 'profileImageUrl' | 'userId'>;

export type CommunityDetailModel = {
  communityId: number;
  logoImageUrl: string;
  coverImageUrl?: string;
  title: string;
  userCount: number;
  description: string;
  invitationCode: string;
};

export type CommunityListModel = Omit<
  CommunityDetailModel,
  'coverImageUrl' | 'description' | 'invitationCode'
>;

export type CommunityIdCardsModel = {
  idCardId: number;
  profileImageUrl: string;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
  commentCount: number;
  toNudgeType: NudgeModel;
};

// FIXME: 이거 안 쓰는 거 같은데 맞나요?
export type CommunityCodeModel = {
  id: number;
  invitationCode: string;
};

export type InvitationCodeValidationModel = {
  checkInvitationCodeDto: {
    communityId: number;
    name: string;
  };
};

export type CommunityJoinModel = {
  communityId: number;
};

export type CheckIdCardModel = {
  communityId: number;
  userMakeIdCard: boolean;
};

export type CommunityUserInfoModel = {
  userId: number;
  nickname: string | null;
  profileImageUrl: string | null;
  isAdmin: boolean;
  isExistsIdCard: boolean;
};

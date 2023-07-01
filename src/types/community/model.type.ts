import { CharacterNameModel, IdCardDetailModel } from '~/types/idCard';

export type CommunityIdCardSummaryModel = Omit<IdCardDetailModel, 'profileImageUrl'>;

export type CommunityDetailModel = {
  communityId: number;
  logoImageUrl: string;
  coverImageUrl: string;
  title: string;
  idCardCount: number;
  description: string;
  invitationCode: string;
};

export type CommunityListModel = Omit<
  CommunityDetailModel,
  'coverImageUrl' | 'description' | 'invitationCode'
>;

export type CommunityIdCardsModel = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
};

// FIXME: 이거 안 쓰는 거 같은데 맞나요?
export type CommunityCodeModel = {
  id: number;
  invitationCode: string;
};

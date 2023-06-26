import { CharacterNameModel, IdCardDetailModel } from '~/types/idCard';

export type CommunityIdCardSummaryModel = Omit<IdCardDetailModel, 'profileImageUrl'>;

export type CommunityDetailModel = {
  communityId: number;
  logoImageUrl: string;
  coverImageUrl: string;
  title: string;
  idCardCount: number;
  description: string;
};

export type CommunityListModel = Omit<CommunityDetailModel, 'coverImageUrl' | 'description'>;

export type CommunityIdCardsModel = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
};

export type CommunityCodeModel = {
  id: number;
  invitationCode: string;
};

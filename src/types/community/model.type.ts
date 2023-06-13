import { CharacterNameModel, IdCardDetailModel } from '~/types/idCard';

export type CommunityIdCardSummaryModel = Omit<IdCardDetailModel, 'profileImageUrl'>;

export type CommunitySummaryModel = {
  communityId: number;
  thumbnailImageUrl: string;
  coverImageUrl: string;
  title: string;
};

export type CommunityIdCardsModel = {
  idCardId: number;
  nickname: string;
  aboutMe: string;
  characterType: CharacterNameModel;
  keywordTitles: string[];
};

import { useMutation, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import {
  CommunityMyIdCardDetailResponse,
  EditIdCardRequest,
  IdCardDetailResponse,
  IdCardEditResponse,
} from '~/types/idCard';

export const idCardQueryKey = {
  idCards: (idCardId: number) => ['getIdCardDetail', idCardId],
};

export const getIdCardDetail = (idCardId: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

// 폴더 관련 고민
export const getCommunityMyIdCardDetail = (communityId: number) =>
  privateApi.get<CommunityMyIdCardDetailResponse>(`/communities/${communityId}/users/idCards`);
export const editIdCardDetail = (idCardInfo: EditIdCardRequest) => {
  const { idCardId, profileImageUrl, nickname, aboutMe, keywords } = idCardInfo;
  return privateApi.put<IdCardEditResponse>(`/id-cards/${idCardId}`, {
    profileImageUrl,
    nickname,
    aboutMe,
    keywords,
  });
};

export const useEditIdCardDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idCardInfo: EditIdCardRequest) => editIdCardDetail(idCardInfo),
    onSuccess: (data: IdCardEditResponse) => {
      queryClient.invalidateQueries(idCardQueryKey.idCards(data.id));
    },
  });
};

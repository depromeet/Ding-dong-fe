import { useMutation, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { EditIdCardRequest, EditIdCardResponse, IdCardDetailResponse } from '~/types/idCard';

export const idCardQueryKey = {
  idCards: (idCardId: number) => ['getIdCardDetail', idCardId],
};

export const getIdCardDetail = (idCardId: string) =>
  privateApi.get<IdCardDetailResponse>(`/id-cards/${idCardId}`);

export const editIdCardDetail = (idCardInfo: EditIdCardRequest) => {
  const { idCardId, profileImageUrl, nickname, aboutMe, keywords } = idCardInfo;
  return privateApi.put<EditIdCardResponse>(`/id-cards/${idCardId}`, {
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
    onSuccess: (data: EditIdCardResponse) => {
      queryClient.invalidateQueries(idCardQueryKey.idCards(data.id));
    },
  });
};

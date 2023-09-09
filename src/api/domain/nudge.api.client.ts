import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import privateApi from '~/api/config/privateApi';
import { idCardQueryKey } from '~/api/domain/idCard.api';
import { useToastMessageStore } from '~/stores/toastMessage.store';
import { NudgePostRequest } from '~/types/nudge/request.type';
import { NudgeListResponse } from '~/types/nudge/response.type';

export const nudgeQueryKey = {
  send: (userId: number) => ['nudge', userId],
  list: (idCardsId: number) => ['nudgeList', idCardsId],
};

export const usePostNudge = (userId: number, idCardId: number, nickname: string) => {
  const queryClient = useQueryClient();
  const { successToast, errorToast } = useToastMessageStore();

  return useMutation({
    mutationFn: (nudgeType: NudgePostRequest) =>
      privateApi.post(`/nudges/users/${userId}`, nudgeType),
    onSuccess: async () => {
      await queryClient.invalidateQueries(idCardQueryKey.idCards(idCardId));
      successToast(`${nickname}에게 성공적으로 딩동을 보냈어요!`);
    },
    onError: () => errorToast('콕 찌르기에 실패했습니다. 다시 시도해 주세요.'),
  });
};

export const getNudgeList = (idCardsId: number) =>
  privateApi.get<NudgeListResponse>(`/nudges/id-cards/${idCardsId}`);

export const useGetNudgeList = (idCardsId: number) => {
  return useQuery(nudgeQueryKey.list(idCardsId), () => getNudgeList(idCardsId), {
    retry: false,
  });
};

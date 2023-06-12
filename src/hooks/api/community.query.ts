import { useInfiniteQuery } from '@tanstack/react-query';

import { community } from '@/hooks/api/queryKey.type';
import communityApi from '@/lib/api/domain/community.api';
import { ComunityIdCardsRequest } from '@/types/community/request.type';

export const useGetCommunityIdCards = ({ id, pageParam }: ComunityIdCardsRequest) => {
  return useInfiniteQuery(
    community.idCards(id, pageParam),
    ({ pageParam = 0 }) => communityApi.getCommunityIdCards(id, pageParam),
    {
      getNextPageParam: data =>
        !data.communityIdCardsDtos.hasNext ? data.communityIdCardsDtos.page + 1 : undefined,
      refetchOnWindowFocus: false,
      //NOTE: 서버컴포넌트에서 이미 1페이지를 데이터 fetch 했기 때문에 2페이지 부터 fetch 하기 위함입니다.
      enabled: false,
    },
  );
};

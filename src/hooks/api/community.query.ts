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
        !data.data.communityIdCardsDtos.hasNext
          ? data.data.communityIdCardsDtos.page + 1
          : undefined,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  );
};

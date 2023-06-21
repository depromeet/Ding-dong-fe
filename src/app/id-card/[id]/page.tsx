import 'server-only';

import { dehydrate, Hydrate } from '@tanstack/react-query';

import { commentQueryKey, getCommentCounts, getComments } from '~/api/domain/comment.api';
import { getIdCardDetail } from '~/api/domain/idCard.api';
import { Divider } from '~/components/Divider';
import { TopNavigation } from '~/components/TopNavigation';
import getQueryClient from '~/lib/tanstackQuery/getQueryClient';
import { CommentList } from '~/modules/CommentList';
import { Intro, KeywordContentCard } from '~/modules/IdCardDetail';
import { CharacterNameModel } from '~/types/idCard';

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

type IdCardDetailPageProps = {
  params: {
    id: string;
  };
};

// TODO: promise all 로 수정하기
const IdCardDetailPage = async ({ params: { id } }: IdCardDetailPageProps) => {
  const { idCardDetailsDto } = await getIdCardDetail(id);

  const bgColor = bgColors[idCardDetailsDto.characterType];

  // 로그인한 유저의 id면 수정페이지로 이동할 수 있는 버튼 보이게하기 (다래님이 만들어주심)

  const idCardsId = Number(id); // TODO: params를 number로 변환하는 작업을 통일할 예정

  const queryClient = getQueryClient();
  const pageParam = 1;

  await queryClient.prefetchQuery(commentQueryKey.comments(idCardsId, pageParam), () =>
    getComments({ idCardsId, pageParam }).then(data => ({ pages: [data] })),
  );

  const totalCommentCount = await getCommentCounts({ idCardsId });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <main>
        <TopNavigation bgColor={bgColor}>
          <TopNavigation.Left>
            <TopNavigation.BackButton />
          </TopNavigation.Left>
        </TopNavigation>
        <div className={`${bgColor} pt-[44px]`}>
          <Intro {...idCardDetailsDto} />
          <div className="flex flex-col gap-4 bg-white px-5 py-6">
            {idCardDetailsDto.keywords.map(keyword => (
              <KeywordContentCard
                key={keyword.keywordId}
                title={keyword.title}
                image={
                  keyword.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={keyword.imageUrl}
                      alt={keyword.title}
                      className="mx-auto my-0 max-h-[192px] max-w-[308px] object-contain"
                    />
                  )
                }
                content={keyword.content}
              />
            ))}
          </div>
        </div>
        <Divider />
        <div className="mt-24pxr px-layout-sm text-b2 text-grey-900">
          <span>댓글 {totalCommentCount.count}개</span>
        </div>
        <CommentList idCardsId={idCardsId} />
      </main>
    </Hydrate>
  );
};

export default IdCardDetailPage;

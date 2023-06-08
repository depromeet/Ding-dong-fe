import TopNavigation from '@/components/TopNavigation/TopNavigation';
import idCardApi from '@/lib/api/domain/id-cards.api';
import { Intro } from '@/modules/IdCardDetail/Intro';
import { KeywordContentCard } from '@/modules/IdCardDetail/KeywordContentCard/KeywordContentCard.server';
import { CharacterType } from '@/types/user.type';

const bgColors: Record<CharacterType, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

const IdCardDetailPage = async ({ params }: { params: { id: string } }) => {
  const { data } = await idCardApi.getIdCardDetail(params.id);
  const bgColor = bgColors[data.idCardDetailsDto.characterType];

  return (
    <main>
      <TopNavigation bgColor={bgColor} />
      <div className={`${bgColor} pt-[44px]`}>
        <Intro {...data.idCardDetailsDto} />
        <div className="flex flex-col gap-4 bg-white px-5 py-6">
          {data.idCardDetailsDto.keywords.map(keyword => (
            <KeywordContentCard key={keyword.keywordId} {...keyword} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default IdCardDetailPage;

import 'server-only';

import TopNavigation from '@/components/TopNavigation/TopNavigation';
import idCardApi from '@/lib/api/domain/idCard.api';
import { Intro, KeywordContentCard } from '@/modules/IdCardDetail';
import { CharacterNameModel } from '@/types/idCard';
import Image from 'next/image';

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

const IdCardDetailPage = async ({ params: { id } }: IdCardDetailPageProps) => {
  const { data } = await idCardApi.getIdCardDetail(id);
  const idCardDetailsDto = data.idCardDetailsDto;

  const bgColor = bgColors[idCardDetailsDto.characterType];

  return (
    <main>
      <TopNavigation bgColor={bgColor} />
      <div className={`${bgColor} pt-[44px]`}>
        <Intro {...idCardDetailsDto} />
        <div className="flex flex-col gap-4 bg-white px-5 py-6">
          {idCardDetailsDto.keywords.map(keyword => (
            <KeywordContentCard
              key={keyword.keywordId}
              title={keyword.title}
              image={
                keyword.imageUrl && (
                  <Image
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
    </main>
  );
};

export default IdCardDetailPage;

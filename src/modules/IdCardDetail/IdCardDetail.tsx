import { getIdCardDetailServer } from '~/api/domain/idCard.api.server';
import { TopNavigation } from '~/components/TopNavigation';
import { Intro, KeywordContentCard } from '~/modules/IdCardDetail';
import { CharacterNameModel } from '~/types/idCard';

const bgColors: Record<CharacterNameModel, string> = {
  BUDDY: 'bg-buddy-100',
  TOBBY: 'bg-tobby-100',
  PIPI: 'bg-pipi-100',
  TRUE: 'bg-true-100',
};

type IdCardDetailProps = {
  idCardsId: number;
};

export const IdCardDetail = async ({ idCardsId }: IdCardDetailProps) => {
  const { idCardDetailsDto } = await getIdCardDetailServer(idCardsId);
  const bgColor = bgColors[idCardDetailsDto.characterType];

  return (
    <>
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
    </>
  );
};

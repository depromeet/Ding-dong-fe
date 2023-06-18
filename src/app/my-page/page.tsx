import 'server-only';

import { getCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import { IdCard } from '~/modules/IdCard';
import { IdCardEditButton } from '~/modules/IdCardEditButton';
import { PlanetCreationButton } from '~/modules/PlanetCreationButton';

export const dynamic = 'force-dynamic';

const MyPage = async () => {
  // TODO: 행성전환 store에서 가져오기
  const communityId = 123;
  const { idCardDetailsDto } = await getCommunityMyIdCardDetail(communityId);
  const { idCardId, nickname, aboutMe, characterType, keywords } = idCardDetailsDto;
  const keywordTitles = keywords.map(keyword => keyword.title);

  return (
    <main className="pt-35pxr">
      <div className="mx-layout-l">
        <div className="mb-16pxr flex w-full justify-between">
          <h2 className="text-h3 text-grey-800">내 주민증</h2>
          <IdCardEditButton />
        </div>
        <IdCard
          idCardId={idCardId}
          nickname={nickname}
          aboutMe={aboutMe}
          characterType={characterType}
          keywordTitles={keywordTitles}
        />
      </div>
      <div className="mx-layout-sm mt-28pxr">
        <PlanetCreationButton />
      </div>
    </main>
  );
};

export default MyPage;

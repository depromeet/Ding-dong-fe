import { GearFillIcon } from '~/components/Icon';
import { TopNavigation } from '~/components/TopNavigation';
import { createIdCard } from '~/mocks/idCard/idCard.mock';
import { IdCard } from '~/modules/IdCard';

const MyPage = () => {
  // TODO: 해당 행성에서 내 주민증 정보 요청 api 추가 예정
  const { idCardId, nickname, aboutMe, characterType, keywords } = createIdCard();
  const keywordTitles = keywords.map(keyword => keyword.title);
  return (
    <main>
      <TopNavigation>
        <TopNavigation.Left>커뮤니티 이동 컴포넌트</TopNavigation.Left>
        <TopNavigation.Title></TopNavigation.Title>
        <TopNavigation.Right>
          <GearFillIcon />
        </TopNavigation.Right>
      </TopNavigation>
      <div className="mt-[86px]">
        {/* TODO: mt[-50px]: 레이아웃 조정하면서 빼야하는 top-navigation height */}
        <h2 className="mb-16pxr text-h3 text-grey-800">내 주민증</h2>
        <IdCard
          idCardId={idCardId}
          nickname={nickname}
          aboutMe={aboutMe}
          characterType={characterType}
          keywordTitles={keywordTitles}
        />
      </div>
      <div className="mt-28pxr">
        {/* 해당 block는 좌표 관련 기획이 마무리되면 추가할 예정 */}
        <div>행성 만들기</div>
        <div>좌표로 행성 찾기</div>
      </div>
    </main>
  );
};

export default MyPage;

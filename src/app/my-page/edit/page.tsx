import { createIdCard } from '~/mocks/idCard/idCard.mock';
import { IdCardEditor } from '~/modules/IdCardEditor';

const EditMyPage = () => {
  // TODO: api나오면 수정 예정
  const idCardDetailsDto = createIdCard();
  const { idCardId, nickname, aboutMe, profileImageUrl, keywords } = idCardDetailsDto;

  return (
    <main>
      <IdCardEditor
        idCardId={idCardId}
        nickname={nickname}
        aboutMe={aboutMe}
        profileImageUrl={profileImageUrl}
        keywords={keywords}
      />
    </main>
  );
};

export default EditMyPage;

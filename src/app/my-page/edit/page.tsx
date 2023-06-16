import 'server-only';

import { getIdCardDetail } from '~/api/domain/idCard.api';
import { IdCardEditor } from '~/modules/IdCardEditor';

type EditMyPageProps = {
  params: {
    id: string;
  };
};

const EditMyPage = async ({ params: { id } }: EditMyPageProps) => {
  // TODO: api나오면 수정 예정
  const { idCardDetailsDto } = await getIdCardDetail(id);
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

import 'server-only';

import { getCommunityMyIdCardDetail } from '~/api/domain/idCard.api';
import { IdCardEditor } from '~/modules/IdCardEditor';

type EditMyPageProps = {
  params: {
    id: number;
  };
};

const EditMyPage = async ({ params: { id } }: EditMyPageProps) => {
  const { idCardDetailsDto } = await getCommunityMyIdCardDetail(id);
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

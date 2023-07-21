import { commentQueryKey } from '~/api/domain/comment/comment.api';
import { getCommentsServer } from '~/api/domain/comment/comment.api.server';
import { idCardQueryKey } from '~/api/domain/idCard.api';
import { getIdCardDetailServer } from '~/api/domain/idCard.api.server';
import { userQueryKey } from '~/api/domain/user.api';
import { getUserInfoServer } from '~/api/domain/user.api.server';
import { CommentCount } from '~/app/planet/[communityId]/id-card/[idCardId]/components/CommentCount';
import { CommentList } from '~/app/planet/[communityId]/id-card/[idCardId]/components/CommentList';
import { IdCardDetail } from '~/app/planet/[communityId]/id-card/[idCardId]/components/IdCardDetail';
import { Divider } from '~/components/Divider';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommentInput } from '~/modules/CommentInput';
import { DINGDONG_PLANET } from '~/utils/variable';

type IdCardDetailPageProps = {
  params: {
    idCardId: string;
    communityId: string;
  };
};

const IdCardDetailPage = ({
  params: { idCardId: idCardIdParam, communityId: communityIdParam },
}: IdCardDetailPageProps) => {
  const isDingDongPlanet = Number(communityIdParam) === DINGDONG_PLANET.DINGDONG_PLANET_ID;
  const idCardId = Number(idCardIdParam);
  const communityId = Number(communityIdParam);

  const getCommentsQuery = async () => {
    const data = await getCommentsServer({ idCardId });
    return {
      pages: [data],
    };
  };

  const getUserInfoQuery = async () => {
    const { userProfileDto } = await getUserInfoServer();
    return {
      userProfileDto,
    };
  };

  const getIdCardDetailQuery = async () => {
    const { idCardDetailsDto } = await getIdCardDetailServer(idCardId);

    return {
      idCardDetailsDto,
    };
  };

  return (
    <main>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider queryKey={idCardQueryKey.idCards(idCardId)} queryFn={getIdCardDetailQuery}>
        {/* @ts-expect-error Server Component */}
        <HydrationProvider queryKey={userQueryKey.userInfo()} queryFn={getUserInfoQuery}>
          <IdCardDetail idCardId={idCardId} communityId={communityId} />
        </HydrationProvider>
      </HydrationProvider>
      {!isDingDongPlanet && (
        <>
          <Divider />
          <CommentCount idCardId={idCardId} />
          {/* @ts-expect-error Server Component */}
          <HydrationProvider
            queryKey={commentQueryKey.comments(idCardId)}
            queryFn={getCommentsQuery}
          >
            <CommentList idCardId={idCardId} />
          </HydrationProvider>
          <CommentInput idCardId={idCardId} communityId={communityId} />
        </>
      )}
    </main>
  );
};

export default IdCardDetailPage;

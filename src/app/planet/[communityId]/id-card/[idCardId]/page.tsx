import 'server-only';

import { commentQueryKey } from '~/api/domain/comment/comment.api';
import { getCommentsServer } from '~/api/domain/comment/comment.api.server';
import { CommentCount } from '~/app/planet/[communityId]/id-card/[idCardId]/components/CommentCount';
import { CommentList } from '~/app/planet/[communityId]/id-card/[idCardId]/components/CommentList';
import { IdCardDetail } from '~/app/planet/[communityId]/id-card/[idCardId]/components/IdCardDetail';
import { Divider } from '~/components/Divider';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommentInput } from '~/modules/CommentInput';

type IdCardDetailPageProps = {
  params: {
    idCardId: string;
    communityId: string;
  };
};

const IdCardDetailPage = async ({
  params: { idCardId: idCardIdParam, communityId: communityIdParam },
}: IdCardDetailPageProps) => {
  const idCardId = Number(idCardIdParam);
  const communityId = Number(communityIdParam);

  const getCommentsQuery = async () => {
    const data = await getCommentsServer({ idCardId });
    return {
      pages: [data],
    };
  };

  return (
    <main>
      <IdCardDetail idCardId={idCardId} communityId={communityId} />
      <Divider />
      <CommentCount idCardId={idCardId} />
      {/* @ts-expect-error Server Component */}
      <HydrationProvider queryKey={commentQueryKey.comments(idCardId)} queryFn={getCommentsQuery}>
        <CommentList idCardId={idCardId} />
      </HydrationProvider>
      <CommentInput idCardId={idCardId} communityId={communityId} />
    </main>
  );
};

export default IdCardDetailPage;

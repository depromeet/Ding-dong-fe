import 'server-only';

import { commentQueryKey } from '~/api/domain/comment/comment.api';
import { getCommentsServer } from '~/api/domain/comment/comment.api.server';
import { CommentCount } from '~/app/planet/[communityId]/id-card/[userId]/components/CommentCount';
import { CommentList } from '~/app/planet/[communityId]/id-card/[userId]/components/CommentList';
import { IdCardDetail } from '~/app/planet/[communityId]/id-card/[userId]/components/IdCardDetail/IdCardDetail';
import { Divider } from '~/components/Divider';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommentInput } from '~/modules/CommentInput';

type IdCardDetailPageProps = {
  params: {
    userId: string;
  };
};

const IdCardDetailPage = async ({ params: { userId } }: IdCardDetailPageProps) => {
  const idCardId = Number(userId);
  const pageParam = 1;

  const getCommentsQuery = async () => {
    const data = await getCommentsServer({ idCardId, pageParam });
    return {
      pages: [data],
    };
  };

  return (
    <main>
      <IdCardDetail idCardId={idCardId} />
      <Divider />
      <CommentCount idCardId={idCardId} />
      {/* @ts-expect-error Server Component */}
      <HydrationProvider queryKey={commentQueryKey.comments(idCardId)} queryFn={getCommentsQuery}>
        <CommentList idCardId={idCardId} />
      </HydrationProvider>
      <CommentInput idCardId={idCardId} />
    </main>
  );
};

export default IdCardDetailPage;

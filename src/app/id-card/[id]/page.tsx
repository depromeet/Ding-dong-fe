import 'server-only';

import { commentQueryKey } from '~/api/domain/comment.api';
import { getCommentsServer } from '~/api/domain/comment.api.server';
import { CommentCount } from '~/app/id-card/[id]/components/CommentCount';
import { CommentList } from '~/app/id-card/[id]/components/CommentList';
import { IdCardDetail } from '~/app/id-card/[id]/components/IdCardDetail/IdCardDetail';
import { Divider } from '~/components/Divider';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommentInput } from '~/modules/CommentInput';

type IdCardDetailPageProps = {
  params: {
    id: string;
  };
};

const IdCardDetailPage = async ({ params: { id } }: IdCardDetailPageProps) => {
  const idCardsId = Number(id);
  const pageParam = 1;

  const getCommentsQuery = async () => {
    const data = await getCommentsServer({ idCardsId, pageParam });
    return {
      pages: [data],
    };
  };

  return (
    <main>
      <IdCardDetail idCardsId={idCardsId} />
      <Divider />
      <CommentCount idCardsId={idCardsId} />
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={commentQueryKey.comments(idCardsId, pageParam)}
        queryFn={getCommentsQuery}
      >
        <CommentList idCardsId={idCardsId} />
      </HydrationProvider>
      <CommentInput />
    </main>
  );
};

export default IdCardDetailPage;

import 'server-only';

import { commentQueryKey } from '~/api/domain/comment/comment.api';
import { getCommentsServer } from '~/api/domain/comment/comment.api.server';
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
  const idCardId = Number(id);
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

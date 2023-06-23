import 'server-only';

import { Suspense } from 'react';

import { commentQueryKey } from '~/api/domain/comment.api';
import { getCommentsServer } from '~/api/domain/comment.api.server';
import { Divider } from '~/components/Divider';
import RetryErrorBoundary from '~/components/ErrorBoundary/RetryErrorBoundary.client';
import { HydrationProvider } from '~/components/HydrationProvider';
import { CommentCount } from '~/modules/CommentCount';
import { CommentInput } from '~/modules/CommentInput';
import { CommentList } from '~/modules/CommentList';
import { IdCardDetail } from '~/modules/IdCardDetail';

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
      <RetryErrorBoundary>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <IdCardDetail />
        </Suspense>
      </RetryErrorBoundary>
      <Divider />
      <RetryErrorBoundary>
        <Suspense>
          {/* @ts-expect-error Server Component */}
          <CommentCount idCardsId={idCardsId} />
        </Suspense>
      </RetryErrorBoundary>
      {/* @ts-expect-error Server Component */}
      <HydrationProvider
        queryKey={commentQueryKey.comments(idCardsId, pageParam)}
        queryFn={getCommentsQuery}
      >
        <RetryErrorBoundary>
          <Suspense>
            <CommentList idCardsId={idCardsId} />
          </Suspense>
        </RetryErrorBoundary>
      </HydrationProvider>
      <CommentInput />
    </main>
  );
};

export default IdCardDetailPage;

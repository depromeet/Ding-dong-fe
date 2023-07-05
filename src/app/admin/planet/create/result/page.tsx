'use client';

import { useSearchParams } from 'next/navigation';

import { InvitationButtons } from '~/modules/InvitationButtons/InvitationButtons.client';

const AdminCommunityCreateResultPage = () => {
  const searchParams = useSearchParams();
  const communityIdParam = searchParams.get('communityId');
  const communityId = isNaN(Number(communityIdParam)) ? -1 : Number(communityIdParam);

  return (
    <div className="mt-3pxr">
      <InvitationButtons communityId={communityId} />
    </div>
  );
};

export default AdminCommunityCreateResultPage;

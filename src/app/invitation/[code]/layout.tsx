import { PropsWithChildren } from 'react';

const INVITATION_OG_TITLE = '초대';
const INVITATION_OG_DESC = '딩동! 초대장이 도착했어요. 지금 바로 행성에 방문해 보세요!';
const INVITATION_OG_IMAGE = '/assets/images/invitation-og-image.png';

export const metadata = {
  title: INVITATION_OG_TITLE,
  description: {
    default: INVITATION_OG_DESC,
  },
  openGraph: {
    title: INVITATION_OG_TITLE,
    description: INVITATION_OG_DESC,
    images: [INVITATION_OG_IMAGE],
  },
  twitter: {
    title: INVITATION_OG_TITLE,
    description: INVITATION_OG_DESC,
    images: [INVITATION_OG_IMAGE],
  },
};

const InvitationLayout = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>;
};

export default InvitationLayout;

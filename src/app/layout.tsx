import '../styles/globals.css';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import { ROOT_URL } from '~/api/config/requestUrl';

import Provider from './Provider';

const DEFAULT_OG_TITLE = 'Ding-Dong';
const DEFAULT_OG_DESC = '딩동으로 새로운 팀원들과 TMI를 공유하고 친해지고 싶은 마음을 전해보세요!';
const DEFAULT_OG_IMAGE = '/assets/images/default-og-image.png';

export const metadata = {
  metadataBase: new URL(ROOT_URL),
  title: {
    template: `${DEFAULT_OG_TITLE} / %s `,
    default: DEFAULT_OG_TITLE,
  },
  description: {
    default: DEFAULT_OG_DESC,
  },
  url: ROOT_URL,
  openGraph: {
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESC,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    title: DEFAULT_OG_TITLE,
    description: DEFAULT_OG_DESC,
    images: [DEFAULT_OG_IMAGE],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <div id="portal" />
        <div id="toast-portal" />
      </body>
    </html>
  );
};

export default RootLayout;

import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';

const auth = async (req: NextRequest, res: NextApiResponse) => {
  return NextAuth(req as unknown as NextApiRequest, res, {
    providers: [
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID ?? '',
        clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account?.accessToken) {
          token.accessToken = account.accessToken;
        }
        return token;
      },
    },
    pages: {
      signIn: '/api/auth/signin',
    },
  });
};

export { auth as GET, auth as POST };

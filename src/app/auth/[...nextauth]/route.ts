import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { AuthOptions, CookiesOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';

const cookies: Partial<CookiesOptions> = {
  csrfToken: {
    name: 'next-auth.csrf-token',
    options: {},
  },
};

export const authOptions: AuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID ?? '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET ?? '',
      authorization: 'https://kauth.kakao.com/oauth/authorize',
    }),
  ],
  cookies: cookies,
  callbacks: {
    async jwt({ token, account }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const auth = async (req: NextRequest, res: NextApiResponse) => {
  return NextAuth(req as unknown as NextApiRequest, res, authOptions);
};

export { auth as GET, auth as POST };

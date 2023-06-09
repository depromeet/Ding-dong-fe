import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/auth/[...nextauth]/route';

import { SignInProviders } from './signInProviders';

const SignInPage = async () => {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }
  return (
    <>
      <div className="flex h-screen flex-col justify-between px-6 pb-20 pt-28">
        <div>
          <div className="text-4xl">LOGO</div>
          <div className="mt-8 flex h-72 w-full items-center justify-center rounded-full bg-gray-100 text-center">
            graphic
          </div>
        </div>
        {/* @ts-expect-error Server Component */}
        <SignInProviders />
      </div>
    </>
  );
};

export default SignInPage;

'use client';

import { signOut, useSession } from 'next-auth/react';
import SignIn from '../api/auth/signin/page';

const Home = () => {
  const { data: session } = useSession();
  return (
    <div className="flex h-screen flex-col justify-between px-6 pb-20 pt-28">
      <div>
        <div className="text-4xl">LOGO</div>
        <div className="mt-8 flex h-72 w-full items-center justify-center rounded-full bg-gray-100 text-center">
          graphic
        </div>
      </div>

      {session ? (
        <div>
          환영합니다 {session?.user?.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Home;

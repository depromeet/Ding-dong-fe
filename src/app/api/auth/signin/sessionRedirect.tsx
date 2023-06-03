'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const SessionRedirect = () => {
  const session = useSession();
  useEffect(() => {
    if (session) {
      redirect('/onboarding');
    }
  }, [session]);
  return <></>;
};

export default SessionRedirect;

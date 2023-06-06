'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

const Portal = ({ children }: PropsWithChildren) => {
  const ref = useRef<Element | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    ref.current = document.getElementById('portal');
  }, [isMounted]);

  if (!(isMounted && ref.current)) return null;

  return createPortal(children, ref.current);
};

export default Portal;

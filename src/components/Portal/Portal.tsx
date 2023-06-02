'use client';

import { PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';

import useIsMounted from '@/hooks/useIsMounted';

const Portal = ({ children }: PropsWithChildren) => {
  const isMounted = useIsMounted();
  const element = document.querySelector('#portal');

  if (!element || !isMounted) return null;
  return ReactDOM.createPortal(children, element);
};

export default Portal;

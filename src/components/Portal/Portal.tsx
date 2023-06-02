'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const element = document.querySelector('#portal');

  if (!element || !mounted) return null;
  return ReactDOM.createPortal(children, element);
};

export default Portal;

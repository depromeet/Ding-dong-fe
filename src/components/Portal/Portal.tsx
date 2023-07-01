'use client';

import { PropsWithChildren, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useIsMounted from '~/hooks/useIsMounted.hooks';

export type PortalProps = {
  documentId?: string;
};

const findWrapperElement = (documentId: string): Element | null => {
  const wrapper = document.getElementById(documentId);
  if (wrapper) {
    return wrapper;
  } else {
    console.warn(`Element with ID '${documentId}'가 root layout에 없어요....추가해주세요.`);
    return null;
  }
};

export const Portal = ({ documentId, children }: PropsWithChildren<PortalProps>) => {
  const ref = useRef<Element | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (documentId) {
      const wrapper = findWrapperElement(documentId);
      ref.current = wrapper;
    } else {
      ref.current = findWrapperElement('portal');
    }
  }, [isMounted, documentId]);

  if (!(isMounted && ref.current)) return null;

  return createPortal(children, ref.current);
};

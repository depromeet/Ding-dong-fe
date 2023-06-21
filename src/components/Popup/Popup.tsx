'use client';

import { ReactNode } from 'react';

import { AnimatedPortal } from '~/components/Portal';

export type PopupProps = {
  title?: string;
  description?: string;
  buttons?: ReactNode;
};

const Popup = ({ title, description, buttons }: PopupProps) => {
  return (
    <AnimatedPortal
      motionProps={{ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }}
    >
      <div className="fixed left-0 top-0 h-full w-full bg-black/50">
        <div className="fixed left-2/4 top-2/4 w-72 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white p-22pxr text-center">
          {title && <p className="text-h5 text-black ">{title}</p>}
          {description && <p className="mb-5 mt-3 text-b1 font-normal text-black">{description}</p>}
          {buttons && <div className="flex gap-2">{buttons}</div>}
        </div>
      </div>
    </AnimatedPortal>
  );
};

export default Popup;

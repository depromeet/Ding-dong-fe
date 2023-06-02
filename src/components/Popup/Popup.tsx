'use client';

import { ReactNode } from 'react';

import Portal from '@/components/Portal';

type PopupProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  buttons?: ReactNode;
};

const Popup = ({ isOpen, title, description, buttons }: PopupProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed left-0 top-0 h-full w-full bg-black/50">
        <div className="fixed left-2/4 top-2/4 w-72 -translate-x-2/4 -translate-y-2/4 rounded-xl bg-white p-6 text-center">
          {title && <p className="text-base font-bold">{title}</p>}
          {description && <p className="mb-5 mt-3 text-base font-normal">{description}</p>}
          {buttons && <div className="flex gap-2">{buttons}</div>}
        </div>
      </div>
    </Portal>
  );
};

export default Popup;

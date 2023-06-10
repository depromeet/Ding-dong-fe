import { PropsWithChildren } from 'react';
import * as SwiperReact from 'swiper/react';

type SwiperCardProps = PropsWithChildren;

export const SwiperSlide = ({ children, ...rest }: SwiperCardProps) => {
  return (
    <SwiperReact.SwiperSlide>
      <div className="text-blue h-full w-full" {...rest}>
        {children}
      </div>
    </SwiperReact.SwiperSlide>
  );
};

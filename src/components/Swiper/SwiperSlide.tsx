import { PropsWithChildren } from 'react';
import * as SwiperReact from 'swiper/react';

type SwiperCardProps = PropsWithChildren;

export const SwiperSlide = ({ children, ...rest }: SwiperCardProps) => {
  return (
    <SwiperReact.SwiperSlide>
      <div className="text-blue h-[500px] w-[375px]" {...rest}>
        {children}
      </div>
    </SwiperReact.SwiperSlide>
  );
};

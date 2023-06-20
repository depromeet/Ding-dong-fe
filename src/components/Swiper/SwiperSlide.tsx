import { PropsWithChildren } from 'react';
import * as SwiperReact from 'swiper/react';

type SwiperCardProps = PropsWithChildren;

export const SwiperSlide = ({ children, ...rest }: SwiperCardProps) => {
  return <SwiperReact.SwiperSlide {...rest}>{children}</SwiperReact.SwiperSlide>;
};

SwiperSlide.displayName = 'SwiperSlide';

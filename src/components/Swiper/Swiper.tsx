'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { PropsWithChildren, useRef } from 'react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import * as SwiperReact from 'swiper/react';

type SwiperProps = PropsWithChildren & SwiperReact.SwiperProps;
export const Swiper = ({
  spaceBetween,
  slidesPerView,
  pagination,
  scrollbar,
  onSwiper,
  onSlideChange,
  allowTouchMove,
  children,
}: SwiperProps) => {
  const swiperRef = useRef<SwiperReact.SwiperRef>(null);

  return (
    <SwiperReact.Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination, Scrollbar]}
      spaceBetween={spaceBetween}
      pagination={pagination}
      slidesPerView={slidesPerView}
      scrollbar={scrollbar}
      onSwiper={onSwiper}
      allowTouchMove={allowTouchMove}
      onSlideChange={onSlideChange}
    >
      {children}
    </SwiperReact.Swiper>
  );
};

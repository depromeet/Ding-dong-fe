'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { PropsWithChildren, useRef } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
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
  SwiperCore.use([Autoplay]); // don't need navigation anymore

  const prevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

  const nextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  return (
    <SwiperReact.Swiper
      ref={swiperRef}
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={pagination}
      scrollbar={scrollbar}
      onSwiper={onSwiper}
      allowTouchMove={allowTouchMove}
      onSlideChange={onSlideChange}
    >
      {/* TODO: 리팩토링 필요 */}
      {/* <span slot="container-start">
        <div className="left-floating-el" onClick={prevSlide}>
          prev floating element
        </div>
        <div className="right-floating-el" onClick={nextSlide}>
          next floating element
        </div>
      </span> */}
      {children}
    </SwiperReact.Swiper>
  );
};

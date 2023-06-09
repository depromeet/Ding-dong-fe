import type { Meta, StoryObj } from '@storybook/react';

import { Swiper, SwiperSlide } from './index';

const meta: Meta<typeof Swiper> = {
  title: 'components/Swiper',
  component: Swiper,
  args: {},
};

export default meta;

type Story = StoryObj<typeof Swiper>;

// eslint-disable-next-line react/jsx-key
const SwiperSlideChildren = [<div>1</div>, <div>2</div>, <div>3</div>, <div>4</div>];

export const Primary: Story = {
  render: () => (
    <Swiper spaceBetween={50} slidesPerView={1} pagination={{ clickable: true }}>
      {SwiperSlideChildren.map((child, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-[500px] w-[375px]">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  ),
};

export const CustomBullet: Story = {
  render: () => (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true, bulletActiveClass: '!bg-green-500' }}
    >
      {SwiperSlideChildren.map((child, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-[500px] w-[375px]">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  ),
};

export const PreventTouchMove: Story = {
  render: () => (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: true }}
      allowTouchMove={false}
    >
      {SwiperSlideChildren.map((child, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-[500px] w-[375px]">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  ),
};

export const ScrollbarDraggable: Story = {
  render: () => (
    <Swiper spaceBetween={50} slidesPerView={1} scrollbar={{ draggable: true }}>
      {SwiperSlideChildren.map((child, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-[500px] w-[375px]">{child}</div>
        </SwiperSlide>
      ))}
    </Swiper>
  ),
};

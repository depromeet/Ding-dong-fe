/** @type {import('tailwindcss').Config} */

const pxToRem = (px, base = 16) => `${px / base}rem`;

/**
 * 픽셀 단위의 space(margin, padding) 값을 선언하고, 해당 값들의 rem 단위 변환 값을 반환합니다.
 * ex) key: 2px -> value: "0.125rem"
 * @returns {Object} 픽셀 값들을 키로 가지고 해당 값들의 rem 단위 변환 값을 값으로 가지는 객체입니다.
 */
const declareSpace = () => {
  const numbers = [2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52];
  const spacing = numbers.reduce((acc, px) => {
    acc[`${px}px`] = pxToRem(px);
    return acc;
  }, {});
  return spacing;
};

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

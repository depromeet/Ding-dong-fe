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
      fontSize: {
        // title
        h1: [pxToRem(24), { fontWeight: '700', lineHeight: '140%' }],
        h2: [pxToRem(22), { fontWeight: '700', lineHeight: '140%' }],
        h3: [pxToRem(20), { fontWeight: '700', lineHeight: '145%' }],
        h4: [pxToRem(18), { fontWeight: '700', lineHeight: '145%' }],
        h5: [pxToRem(16), { fontWeight: '500', lineHeight: '145%' }],
        // body
        b1: [pxToRem(15), { fontWeight: '500', lineHeight: '145%' }],
        b2: [pxToRem(14), { fontWeight: '500', lineHeight: '145%' }],
        b3: [pxToRem(13), { fontWeight: '400', lineHeight: '145%' }],
        // detail
        detail: [pxToRem(12), { fontWeight: '400', lineHeight: '125%' }],
      },
      colors: {
        primary: {
          100: '#EAE8FF',
          400: '#7B70FF',
          500: '#5445FF',
          700: '#3024AC',
        },
        white: '#FFFFFF',
        black: '#090909',
        grey: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EFEFEF',
          300: '#E4E4E4',
          400: '#C0C0C0',
          500: '#949494',
          600: '#777777',
          700: '#555555',
          800: '#2A2A2A',
          900: '#111111',
        },
        blue: {
          50: '#F7F7FF',
          100: '#EAE8FF',
          200: '#CBC7FF',
          300: '#A39BFF',
          400: '#7B70FF',
          500: '#5445FF',
          600: '#4739D7',
          700: '#3024AC',
          800: '#2E2E7A',
        },
        positive: '#5445FF',
        error: '#FF465C',
        opacity: {
          100: 'rgba(0, 0, 0, 0.4)',
          200: 'rgba(0, 0, 0, 0.7)',
        },
      },
      spacing: {
        ...declareSpace(),
      },
      // TODO: 아직 폰트가 정해지지 않아 기본 값으로 넣어두었습니다. 폰트 지정 후 수정이 필요합니다.
      fontFamily: {
        Pretendard: ['Pretendard Variable', 'Pretendard'],
        sans: ['Graphik', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};

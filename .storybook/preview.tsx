const path = require('path');

import React from 'react';
import '../src/styles/globals.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as defaultHandlers from '../src/mocks/handlers';
import { AUTH_COOKIE_KEYS } from '../src/types/auth/response.type';

// TODO: Provider폴더 구조 정해지면 수정해야합니다!
const queryClient = new QueryClient();

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [
    mswDecorator,
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
        <div id="portal" />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6',
    },
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: {
        default: defaultHandlers,
      },
    },
    webpackFinal: async config => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '~': path.resolve(__dirname, '../src/'),
      };

      return config;
    },
    cookie: {
      //  TODO: 개발용 token으로 변경, env.dev 사용
      [AUTH_COOKIE_KEYS.accessToken]: '8888',
      [AUTH_COOKIE_KEYS.refreshToken]: '8888',
      [AUTH_COOKIE_KEYS.userId]: '8888',
      [AUTH_COOKIE_KEYS.accessTokenExpireDate]: '8888',
    },
  },
};

export default preview;

const path = require('path');

import React from 'react';
import '../src/styles/globals.css';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { handlers } from '../src/mocks/handlers';
import { AUTH_COOKIE_KEYS } from '../src/types/auth/response.type';

// TODO: Provider폴더 구조 정해지면 수정해야합니다!
const queryClient = new QueryClient();
const now = new Date();
const expireDate = Number(now.setDate(now.getDate() + 1));

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [
    mswDecorator,
    Story => (
      <QueryClientProvider client={queryClient}>
        <div id="portal" />
        <div id="toast-portal" />
        <Story />
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
        default: handlers,
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
      [AUTH_COOKIE_KEYS.accessToken]: '8888',
      [AUTH_COOKIE_KEYS.refreshToken]: '8888',
      [AUTH_COOKIE_KEYS.userId]: '8888',
      [AUTH_COOKIE_KEYS.accessTokenExpireDate]: expireDate,
    },
  },
};

export default preview;

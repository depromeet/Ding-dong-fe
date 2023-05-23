const path = require('path');

import React from 'react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import type { Preview } from '@storybook/react';

import '../src/app/globals.css';

// Initialize MSW
initialize();

const preview: Preview = {
  decorators: [mswDecorator, Story => <Story />],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    webpackFinal: async config => {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src/'),
      };

      return config;
    },
  },
};

export default preview;

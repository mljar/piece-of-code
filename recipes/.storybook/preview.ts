import type { Preview } from "@storybook/react";

import { withThemeByClassName } from '@storybook/addon-themes';

import '../src/style.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

/* snipped for brevity */

export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'poc-light',
      dark: 'poc-dark',
    },
    defaultTheme: 'poc-light',
  }),
];

export default preview;

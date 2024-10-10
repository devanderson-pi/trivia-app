import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*tsx'],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: '#007ba3',
        secondary: '#30252f',
        tertiary: '#faffe2',
        error: '#c0180a',
        success: '#097e09',
        background: '#edfeff',
      },
    },
  },
};

export default config;

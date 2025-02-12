import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: '#121212',
        secondary: '#1f1f1f',
        background: '#f8f9fa ',
        destructive: '#dc3545',
        outline: '#6c757d',
        border: '#D1D5DB',
        muted: '#adb5bd',
        onproggress: '#60A5FA',
        done: '#81C784',
        rejected: '#E57373',
      },
    },
  },
  plugins: [],
};
export default config;

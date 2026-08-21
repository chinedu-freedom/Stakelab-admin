/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.375rem',
        sm: '0.375rem',
        md: '0.375rem',
        lg: '0.375rem',
        xl: '0.375rem',
        '2xl': '0.375rem',
        '3xl': '0.375rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
      colors: {
        adminBg: '#0F172A',
        adminCard: '#1E293B',
        adminBorder: '#334155',
        adminPrimary: '#3B82F6',
        brandPrimary: '#10B981',
      },
    },
  },
  plugins: [],
};

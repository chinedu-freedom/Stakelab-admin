import './globals.css';
import { Inter, Righteous } from 'next/font/google';
import Script from 'next/script';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  fallback: ['system-ui', 'sans-serif'],
  adjustFontFallback: false,
});

const righteous = Righteous({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-righteous',
  display: 'swap',
  fallback: ['system-ui', 'cursive'],
  adjustFontFallback: false,
});

export const metadata = {
  title: 'Stakelab Control Portal - Admin Panel',
  description: 'Manage users, staking pools, deposits, withdrawals, and email settings for Stakelab.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${righteous.variable}`}>
      <head>
        <Script
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-[#07193b] text-slate-100 antialiased min-h-screen font-sans`}>
        <AdminAuthProvider>
          {children}
          <Toaster position="top-right" closeButton />
        </AdminAuthProvider>
      </body>
    </html>
  );
}

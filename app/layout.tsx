import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Van Ian Ignacio | QA Portfolio',
  description: 'Professional portfolio showcasing QA automation expertise and projects',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${outfit.variable} ${plusJakartaSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon-vip.ico" sizes="any" />
      </head>
      <body className="bg-base text-text-primary">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

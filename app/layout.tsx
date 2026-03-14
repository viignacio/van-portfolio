import type { Metadata } from 'next';
import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon-vip.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-base text-text-primary">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}

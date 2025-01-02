import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '24 Hour Countdown Timer',
  description: 'A simple countdown timer built with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
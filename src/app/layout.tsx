import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Trivia App',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="antialiased"
      lang="en"
    >
      <body className={roboto.className}>
        <main className="mx-auto max-w-6xl p-2.5">{children}</main>
      </body>
    </html>
  );
}

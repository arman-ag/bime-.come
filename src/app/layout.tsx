import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import MainLayout from './_components/mainLayout';
import './globals.css';
import { Providers } from './redux/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'بیمه دات کام',
  description: 'خرید بیمه',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir='rtl' lang='fa'>
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

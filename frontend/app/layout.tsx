import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Providers } from './providers';
// import '@/global.css'; // Adjust the path as necessary

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PSSSF - Risk Management System.',
  description: 'Risk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
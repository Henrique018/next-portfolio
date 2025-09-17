import type { Metadata } from 'next';
import { Chakra_Petch, Inter } from 'next/font/google';
import { Header } from '@/components/header';
import { siteConfig } from '@/config/content';
import './globals.css';

const chakraPetch = Chakra_Petch({
  variable: '--font-chakra-petch',
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: siteConfig.author.name,
  description: siteConfig.author.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${chakraPetch.variable} ${inter.variable} antialiased`}>
        <Header author={siteConfig.author.name} routes={siteConfig.routes} />
        {children}
      </body>
    </html>
  );
}

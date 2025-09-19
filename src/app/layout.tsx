import type { Metadata } from 'next';
import { Chakra_Petch, Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

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
  metadataBase: new URL(siteConfig.url),
  authors: {
    name: siteConfig.author.name,
  },
  keywords: Object.values(siteConfig.validCategories).flat(),
  openGraph: {
    title: siteConfig.author.name,
    description: siteConfig.author.bio,
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: '/images/profile-pic.png',
        width: 400,
        height: 400,
        alt: siteConfig.author.name,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteConfig.author.name,
    description: siteConfig.author.bio,
    images: ['/images/profile-pic.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${chakraPetch.variable} ${inter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header author={siteConfig.author.name} routes={siteConfig.routes} />
        </ThemeProvider>
        {children}
      </body>
    </html>
  );
}

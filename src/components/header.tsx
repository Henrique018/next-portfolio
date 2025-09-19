'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { SunIcon, MoonIcon } from 'lucide-react';

import { Button } from './ui/button';
import { CodeIcon } from '@/icons/code';
import { cn } from '@/lib/utils';

type HeaderRoutesProps = {
  label: string;
  link: string;
};

type HeaderProps = {
  author: string;
  routes: HeaderRoutesProps[];
};

export const Header = ({ author, routes }: HeaderProps) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const isRouteActive = (routeLink: string) => {
    if (pathname === routeLink) return true;

    if (routeLink.startsWith('#')) {
      const hashSection = routeLink.substring(1);
      return pathname.startsWith(`/${hashSection}`);
    }
  };

  return (
    <header className="flex items-center justify-between px-4 pt-6 font-chakra-petch md:px-32 md:pt-10 lg:pt-20">
      <Link href="/">
        <div className="flex items-center gap-3 lg:gap-5">
          <CodeIcon className="ml-3 size-12 sm:ml-0" />

          <p className="hidden font-bold text-primary uppercase sm:block sm:text-lg md:text-2xl">
            {author}
          </p>
        </div>
      </Link>

      <nav className="flex items-center gap-6">
        <ul className="flex gap-8">
          {routes.map((route) => (
            <li key={route.link}>
              <Link
                href={route.link}
                className={cn('text-lg font-bold text-primary transition-colors lg:text-2xl', {
                  'text-highlight': isRouteActive(route.link),
                })}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span className="sr-only">
            Mudar tema do site para {theme === 'dark' ? 'claro' : 'escuro'}
          </span>
        </Button>
      </nav>
    </header>
  );
};

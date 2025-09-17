'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

  return (
    <header className="flex items-center justify-between px-4 pt-6 font-chakra-petch md:px-32 md:pt-10 lg:pt-20">
      <div className="flex items-center gap-3 lg:gap-5">
        <CodeIcon />
        <p className="text-base font-bold text-primary uppercase sm:text-lg md:text-2xl">
          {author}
        </p>
      </div>

      <nav>
        <ul className="flex gap-4 lg:gap-8">
          {routes.map((route) => (
            <li key={route.link}>
              <Link
                href={route.link}
                className={cn(
                  'text-lg font-bold text-primary transition-colors lg:text-2xl',
                  pathname === route.link && 'text-highlight',
                )}
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

import { MailIcon } from 'lucide-react';
import { siteConfig } from '@/config/content';
import { LinkedinIcon } from '@/icons/linkedin';
import { GitHubIcon } from '@/icons/github';

export const Footer = () => {
  return (
    <footer className="mt-10 mb-10 flex w-full flex-col items-center md:mt-20">
      <div className="mb-10 flex w-full flex-col sm:items-center md:mb-16 md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0">
          <p className="font-chakra-petch font-bold text-highlight">Vamos conversar?</p>
          <h2 className="font-chakra-petch text-3xl font-bold text-primary lg:text-[60px]">
            Entre em contato
          </h2>
        </div>

        <ul className="flex flex-col gap-3 lg:pr-20">
          <li>
            <a href={`mailto:${siteConfig.author.email}`} className="flex items-center gap-2">
              <MailIcon className="text-highlight" />
              {siteConfig.author.email}
            </a>
          </li>
          <li>
            <a
              href={siteConfig.author.social?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline underline-offset-2"
              aria-label="Link para o perfil de LinkedIn"
            >
              <LinkedinIcon />
              /Fernanda Mascheti
            </a>
          </li>
          <li>
            <a
              href={siteConfig.author.social?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 underline underline-offset-2"
            >
              <GitHubIcon />
              /fernandamascheti
            </a>
          </li>
        </ul>
      </div>

      <small className="text-center text-sm md:text-base">
        &copy; Copyright {new Date().getFullYear()}. Produzido por{' '}
        <span className="capitalize">{siteConfig.author.name.toLowerCase()} </span>
      </small>
    </footer>
  );
};

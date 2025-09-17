import Image from 'next/image';
import { siteConfig } from '@/config/content';

export const UserProfile = () => {
  const authorFirstName = siteConfig.author.name.split(' ')[0].toLocaleLowerCase();
  return (
    <div className="flex flex-col items-center">
      <Image
        src={siteConfig.author.avatar}
        alt={`Foto de perfil de ${siteConfig.author.name}`}
        className="mb-6 block rounded-full"
        width={224}
        height={224}
        priority
      />

      <div className="flex flex-col gap-4 text-center">
        <p className="font-chakra-petch text-base font-bold text-highlight">
          Olá, meu nome é <span className="capitalize">{authorFirstName}_</span>
        </p>

        <h2 className="font-chakra-petch text-3xl leading-tight font-bold text-primary lg:text-[60px]">
          {siteConfig.author.role}{' '}
          <span className="text-gradient">{siteConfig.author.roleHighlight}</span>
        </h2>

        <p className="max-w-[580px] text-center">{siteConfig.author.bio}</p>
      </div>
    </div>
  );
};

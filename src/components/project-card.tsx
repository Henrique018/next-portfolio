import Image from 'next/image';
import Link from 'next/link';

type ProjectCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  slug: string;
  category: {
    slug: string;
    name: string;
    description: string;
  };
};

export const ProjectCard = (props: ProjectCardProps) => {
  return (
    <Link href={`/blog/${props.slug}`} className="h-full w-full">
      <div className="flex h-full flex-col gap-6 rounded border border-highlight p-6 transition-shadow hover:shadow-[0_4px_44px_0_rgba(28,167,200,0.30)]">
        <div className="relative h-[196px] w-full">
          <Image
            src={props.imageUrl}
            alt={props.title}
            className="h-full w-full object-cover"
            width={333}
            height={196}
          />
          <span className="absolute right-0 bottom-0 w-32 bg-highlight p-2 text-center font-chakra-petch text-sm text-white">
            {props.category.name}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <h2 className="font-chakra-petch text-lg font-bold text-primary">{props.title}</h2>
          <p className="line-clamp-3 flex-1 text-base">{props.description}</p>
          <span className="font-bold text-highlight">Ler mais</span>
        </div>
      </div>
    </Link>
  );
};

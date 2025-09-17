import { UserProfile } from '@/components/user-profile';
import { ProjectCard } from '@/components/project-card';
import { ProjectsSearch } from '@/components/projects-search';
import GradientBackground from '@/components/gradient-background';
import { Lines } from '@/icons/lines';

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-10 md:px-32 lg:pt-20">
      <GradientBackground>
        <UserProfile />
      </GradientBackground>

      <Lines className="my-10 w-92 md:my-20 md:w-[688px]" />

      <ProjectsSearch />

      <section id="blog" className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          category="Front-end"
          imageUrl="/images/profile-pic.png"
          slug="desenvolvendo-uma-ferramenta-interativa-de-estudo"
          title="Desenvolvendo uma ferramenta interativa de estudo"
          description="Lorem ipsum dolor sit amet consectetur. Et morbi egestas facilisis neque gravida in diam fermentum. Leo sed eu donec mi elit..."
        />
        <ProjectCard
          category="Back-end"
          imageUrl="/images/profile-pic.png"
          slug="utilizando-a-responsividade-em-aplicacoes-com-html-e-css"
          title="Utilizando a responsividade em aplicações com HTML e CSS"
          description="Lorem ipsum dolor sit amet consectetur. Et morbi egestas facilisis neque gravida in diam fermentum. Leo sed eu donec mi elit..."
        />
        <ProjectCard
          category="IA"
          imageUrl="/images/profile-pic.png"
          slug="desenvolvendo-um-site-de-assinatura-de-conteudo"
          title="Desenvolvendo um site de assinatura de conteúdo"
          description="Lorem ipsum dolor sit amet consectetur. Et morbi egestas facilisis neque gravida in diam fermentum. Leo sed eu donec mi elit..."
        />
      </section>
    </main>
  );
}

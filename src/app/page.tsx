import { UserProfile } from '@/components/user-profile';
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
    </main>
  );
}

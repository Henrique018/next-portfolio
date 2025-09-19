import { Suspense } from 'react';

import { searchPosts } from '@/lib/searchPosts';
import { Footer } from '@/components/footer';
import { UserProfile } from '@/components/user-profile';
import { ProjectsList } from '@/components/projects-list';
import { ProjectsSearch } from '@/components/projects-search';
import GradientBackground from '@/components/gradient-background';
import { Lines } from '@/icons/lines';

type HomeProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const PAGE_LIMIT = 6;

export default async function Home({ searchParams }: HomeProps) {
  const search = await searchParams;
  const page = search.page ? parseInt(search.page as string, 10) : 1;
  const category = search.category ? (search.category as string) : undefined;
  const query = search.query ? (search.query as string) : undefined;

  const { posts, pagination } = await searchPosts({
    query,
    category,
    page,
    limit: PAGE_LIMIT,
  });

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-10 md:px-32 lg:pt-20">
      <GradientBackground>
        <UserProfile />
      </GradientBackground>

      <Lines className="my-10 w-92 md:my-20 md:w-[688px]" />

      <ProjectsSearch />

      <Suspense fallback={<div className="animate-pulse">Carregando projetos...</div>}>
        <ProjectsList projects={posts} pagination={pagination} />
      </Suspense>

      <Footer />
    </main>
  );
}

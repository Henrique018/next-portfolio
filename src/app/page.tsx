import { Suspense } from 'react';

import { projectsClient } from '@/services';
import { Footer } from '@/components/footer';
import { UserProfile } from '@/components/user-profile';
import { ProjectsList } from '@/components/projects-list';
import { ProjectsSearch } from '@/components/projects-search';
import GradientBackground from '@/components/gradient-background';
import { siteConfig } from '@/config/content';
import { Lines } from '@/icons/lines';

type HomeProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const PAGE_LIMIT = 6;

const getPosts = async (category?: string, page?: number) => {
  if (
    category &&
    siteConfig.validCategories[category as keyof typeof siteConfig.validCategories]
  ) {
    return await projectsClient.getPostsByCategory(category, {
      page: page,
      limit: PAGE_LIMIT,
    });
  } else {
    return await projectsClient.getPosts({ page: page, limit: PAGE_LIMIT });
  }
};

export default async function Home({ searchParams }: HomeProps) {
  const search = await searchParams;
  const page = search.page ? parseInt(search.page as string, 10) : 1;
  const category = search.category ? (search.category as string) : undefined;

  const { posts, pagination } = await getPosts(category, page);

  return (
    <main className="flex flex-1 flex-col items-center px-4 pt-10 md:px-32 lg:pt-20">
      <GradientBackground>
        <UserProfile />
      </GradientBackground>

      <Lines className="my-10 w-92 md:my-20 md:w-[688px]" />

      <ProjectsSearch />

      <Suspense fallback={<div>Carregando projetos...</div>}>
        <ProjectsList projects={posts} pagination={pagination} />
      </Suspense>

      <Footer />
    </main>
  );
}

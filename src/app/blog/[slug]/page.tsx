import Image from 'next/image';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import { projectsClient } from '@/services';
import { siteConfig } from '@/config/content';
import { buttonVariants } from '@/components/ui/button';
import { ProjectsList } from '@/components/projects-list';
import GradientBackground from '@/components/gradient-background';

export default async function BlogPost({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;

  const data = await projectsClient.getPostById(slug);

  if (!data?.post?.id) {
    notFound();
  }

  const { post } = data;

  const relatedPostsByCategory = await projectsClient.getPostsByCategory(post.category.slug, {
    limit: 3,
  });

  const mostRelatedPosts = relatedPostsByCategory.posts
    .map((relatedPost) => {
      const commonTags = relatedPost.tags.filter((tag) =>
        post.tags.some((postTag) => postTag.slug === tag.slug),
      );
      return { ...relatedPost, commonTagsCount: commonTags.length };
    })
    .sort((a, b) => b.commonTagsCount - a.commonTagsCount)
    .slice(0, 3);

  return (
    <div className="flex flex-col px-4 pt-10 md:px-32 lg:pt-20">
      <GradientBackground as="main">
        <div className="flex w-full flex-col justify-between gap-6 sm:flex-row">
          <div className="flex flex-col gap-6">
            <h1 className="font-chakra-petch text-3xl font-bold text-primary lg:text-4xl xl:text-5xl">
              {post.title}
            </h1>

            <div>
              <p className="mb-7 font-bold">Categoria:</p>
              <span
                className={buttonVariants({
                  variant: 'primary',
                  class: 'w-fit',
                })}
              >
                {post.category.name}
              </span>
            </div>

            <div>
              <p className="mb-7 font-bold">Tags:</p>

              <ul className="flex flex-wrap items-center gap-3">
                {post.tags.map((tag) => (
                  <li
                    key={tag.slug}
                    className={buttonVariants({
                      variant: 'outlined',
                      class: 'w-fit',
                    })}
                  >
                    {tag.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Image
            src={post.imageUrl}
            alt={post.title}
            width={608}
            height={358}
            className="w-full flex-shrink-0 rounded-lg object-cover sm:w-[350px] lg:w-[608px] h-auto"
            fetchPriority="high"
          />
        </div>

        <div className="my-10 lg:mt-16">{post.content}</div>
      </GradientBackground>

      <aside>
        <h2 className="mb-10 font-chakra-petch text-2xl font-bold text-primary">
          Postagens relacionadas
        </h2>

        <Suspense
          fallback={<div className="animate-pulse">Carregando postagens relacionadas...</div>}
        >
          <ProjectsList
            projects={mostRelatedPosts}
            pagination={{ postsPerPage: 3, totalPages: 1, totalPosts: 3, currentPage: 1 }}
          />
        </Suspense>
      </aside>

      <footer className="my-10 w-full text-center">
        <small className="text-center text-sm md:text-base">
          &copy; Copyright {new Date().getFullYear()}. Produzido por{' '}
          <span className="capitalize">{siteConfig.author.name.toLowerCase()} </span>
        </small>
      </footer>
    </div>
  );
}

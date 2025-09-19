import type { Metadata } from 'next';
import { projectsClient } from '@/services';
import { siteConfig } from '@/config/content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await projectsClient.getPostById(slug);
  if (!data?.post?.id) {
    return {
      title: `Postagem não encontrada | ${siteConfig.author.name}`,
      description: `A postagem que você está procurando não foi encontrada. | ${siteConfig.author.name}`,
    };
  }

  const { post } = data;

  const slicedDescription =
    post.content.slice(0, 160) + (post.content.length > 160 ? '...' : '');

  return {
    title: `${post.title} | ${siteConfig.author.name}`,
    authors: {
      name: siteConfig.author.name,
    },
    description: slicedDescription,
    openGraph: {
      title: post.title,
      description: slicedDescription,
      type: 'article',
      images: [
        {
          url: post.imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: slicedDescription,
      images: [post.imageUrl],
    },
  };
}

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
  return children;
}

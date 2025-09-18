'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProjectCard } from '@/components/project-card';
import { Project, PaginationProps } from '@/services/projectsApi/types';
import { DynamicPagination } from '@/components/dynamic-pagination';

type ProjectsListProps = {
  projects: Project[];
  pagination: PaginationProps;
};

export const ProjectsList = ({ projects, pagination }: ProjectsListProps) => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const filteredProjects = useMemo(() => {
    if (!query.trim()) {
      return projects;
    }

    return projects.filter((project) =>
      project.title.toLowerCase().includes(query.toLowerCase()),
    );
  }, [projects, query]);

  return (
    <section id="blog">
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3 md:items-stretch">
        {filteredProjects && filteredProjects.length > 0 ? (
          filteredProjects.map((post) => (
            <ProjectCard
              key={post.id}
              slug={post.id}
              title={post.title}
              category={post.category}
              description={post.content}
              imageUrl={post.imageUrl}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {query.trim()
              ? `Nenhum projeto encontrado com o termo "${query}"`
              : 'Nenhum projeto encontrado'}
          </p>
        )}
      </div>

      <DynamicPagination pagination={pagination} className="my-8" />
    </section>
  );
};

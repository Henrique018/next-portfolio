import { ProjectCard } from '@/components/project-card';
import { Project, PaginationProps } from '@/services/projectsApi/types';
import { DynamicPagination } from '@/components/dynamic-pagination';

type ProjectsListProps = {
  projects: Project[];
  pagination: PaginationProps;
};

export const ProjectsList = ({ projects, pagination }: ProjectsListProps) => {
  return (
    <section id="blog">
      <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:items-stretch lg:grid-cols-3">
        {projects && projects.length > 0 ? (
          projects.map((post) => (
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
          <p className="col-span-full text-center text-gray-500">Nenhum projeto encontrado</p>
        )}
      </div>

      <DynamicPagination pagination={pagination} className="my-8" />
    </section>
  );
};

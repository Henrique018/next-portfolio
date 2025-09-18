export type Project = {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  category: {
    slug: string;
    name: string;
    description: string;
  };
  tags: {
    slug: string;
    name: string;
  }[];
  imageUrl: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

export type ProjectResponse = {
  post: Project;
  meta: {
    generatedAt: string;
    seed: string;
  };
};

export type ProjectsResponse = {
  posts: Project[];
  pagination: PaginationProps;
};

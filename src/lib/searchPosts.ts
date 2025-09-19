'use server';

import { projectsClient } from '@/services';
import { ProjectsResponse, Project } from '@/services/projectsApi/types';

export type SearchFilters = {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
};

const MAX_API_LIMIT = 9;
const TOTAL_PROJECTS = 45;
const TOTAL_PAGES = TOTAL_PROJECTS / MAX_API_LIMIT;

export async function searchPosts(filters: SearchFilters): Promise<ProjectsResponse> {
  const { query, category, page = 1, limit = 6 } = filters;

  try {
    if (!query || !query.trim()) {
      let response;

      if (category) {
        response = await projectsClient.getPostsByCategory(category, {
          page,
          limit,
        });
      } else {
        response = await projectsClient.getPosts({
          page,
          limit,
        });
      }

      return {
        posts: response.posts,
        pagination: {
          currentPage: response.pagination.currentPage,
          totalPages: response.pagination.totalPages,
          totalPosts: response.pagination.totalPosts,
          postsPerPage: response.pagination.postsPerPage,
          hasNextPage: response.pagination.hasNextPage || false,
          hasPreviousPage: response.pagination.hasPreviousPage || false,
        },
      };
    }

    const allProjects: Project[] = [];

    for (let currentPage = 1; currentPage <= TOTAL_PAGES; currentPage++) {
      const response = category
        ? await projectsClient.getPostsByCategory(category, {
            page: currentPage,
            limit: MAX_API_LIMIT,
          })
        : await projectsClient.getPosts({
            page: currentPage,
            limit: MAX_API_LIMIT,
          });

      if (response.posts?.length) {
        allProjects.push(...response.posts);
      }
    }

    const searchTerm = query.toLowerCase().trim();
    const filteredProjects = allProjects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(searchTerm);
      const contentMatch = project.content.toLowerCase().includes(searchTerm);
      const categoryMatch = project.category.name.toLowerCase().includes(searchTerm);
      const tagMatch = project.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm));

      return titleMatch || contentMatch || categoryMatch || tagMatch;
    });

    const totalProjects = filteredProjects.length;
    const totalPages = Math.ceil(totalProjects / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return {
      posts: paginatedProjects,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts: totalProjects,
        postsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error in searchProjects:', error);

    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        postsPerPage: limit,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }
}

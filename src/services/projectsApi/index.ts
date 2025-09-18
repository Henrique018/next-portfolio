import { ProjectResponse, ProjectsResponse } from './types';

type PaginationParams = {
  page?: number;
  limit?: number;
};

export interface IProjectsClient {
  getPosts: (params?: PaginationParams) => Promise<ProjectsResponse>;
  getPostById: (
    id: string,
    paginationParams?: PaginationParams,
  ) => Promise<ProjectResponse | null>;
  getPostsByTag: (
    tag: string,
    paginationParams?: PaginationParams,
  ) => Promise<ProjectsResponse>;
  getPostsByCategory: (
    category: string,
    paginationParams?: PaginationParams,
  ) => Promise<ProjectsResponse>;
}

export class ProjectsClient implements IProjectsClient {
  constructor(private apiUrl: string) {}

  private static buildQueryString(params?: PaginationParams): string {
    const query = new URLSearchParams();

    if (params?.page) {
      query.set('page', params.page.toString());
    }

    if (params?.limit) {
      query.set('limit', params.limit.toString());
    }

    return query.toString();
  }

  private static createEmptyResponse(params?: PaginationParams): ProjectsResponse {
    return {
      posts: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0,
        postsPerPage: params?.limit || 9,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    };
  }

  async getPosts(params?: PaginationParams): Promise<ProjectsResponse> {
    try {
      const queryString = ProjectsClient.buildQueryString(params);
      const response = await fetch(
        `${this.apiUrl}/api/posts${queryString ? `?${queryString}` : ''}`,
      );

      return response.json();
    } catch (error) {
      console.error('Error in getPosts:', error);
      return ProjectsClient.createEmptyResponse(params);
    }
  }

  async getPostById(
    id: string,
    paginationParams?: PaginationParams,
  ): Promise<ProjectResponse | null> {
    try {
      const queryString = ProjectsClient.buildQueryString(paginationParams);
      const response = await fetch(
        `${this.apiUrl}/api/posts/id/${id}${queryString ? `?${queryString}` : ''}`,
      );

      if (response.status === 404) {
        console.warn(`Post with ID ${id} not found`);
        return null;
      }

      return response.json();
    } catch (error) {
      console.error(`Error in getPostById for ID ${id}:`, error);
      return null;
    }
  }

  async getPostsByTag(
    tag: string,
    paginationParams?: PaginationParams,
  ): Promise<ProjectsResponse> {
    try {
      const queryString = ProjectsClient.buildQueryString(paginationParams);
      const response = await fetch(
        `${this.apiUrl}/api/posts/tag/${tag}${queryString ? `?${queryString}` : ''}`,
      );

      return response.json();
    } catch (error) {
      console.error(`Error in getPostsByTag for tag "${tag}":`, error);
      return ProjectsClient.createEmptyResponse(paginationParams);
    }
  }

  async getPostsByCategory(
    category: string,
    paginationParams?: PaginationParams,
  ): Promise<ProjectsResponse> {
    try {
      const queryString = ProjectsClient.buildQueryString(paginationParams);
      const response = await fetch(
        `${this.apiUrl}/api/posts/category/${category}${queryString ? `?${queryString}` : ''}`,
      );

      return response.json();
    } catch (error) {
      console.error(`Error in getPostsByCategory for category "${category}":`, error);

      return ProjectsClient.createEmptyResponse(paginationParams);
    }
  }
}

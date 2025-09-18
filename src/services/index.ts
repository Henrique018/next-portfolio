import { ProjectsClient } from './projectsApi';

const env = process.env.NEXT_PUBLIC_API_URL;

if (!env) {
  throw new Error('Missing API URL in environment variables');
}

export const projectsClient = new ProjectsClient(env);

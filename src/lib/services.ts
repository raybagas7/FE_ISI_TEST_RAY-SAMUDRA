import { ProjectListResponse } from '@/interface/dto';
import agent from './agent';

export async function fetchProjects({
  pageParam,
  search,
  sort = 'createdAt',
  order = 'desc',
  limit,
}: {
  pageParam: number;
  search: string;
  sort: string;
  order: string;
  limit: number;
}): Promise<{
  data: ProjectListResponse;
  currentPage: number;
  nextPage: number | null;
}> {
  try {
    const params = Object.fromEntries(
      new URLSearchParams({
        limit: String(limit),
        page: String(pageParam),
        ...(search && { search }),
        ...(sort && { sort }),
        ...(order && { order }),
      })
    );

    const data = await agent.Project.getAllProject(params);

    return {
      data,
      currentPage: pageParam,
      nextPage: data.pagination.hasMore ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
}

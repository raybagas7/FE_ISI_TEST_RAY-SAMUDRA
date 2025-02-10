import { ProjectListResponse } from '@/interface/dto';

export async function fetchProjects({
  pageParam,
  search,
  sort = 'createdAt',
  order = 'asc',
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
    const params = new URLSearchParams({
      limit: String(limit),
      page: String(pageParam),
    });
    if (search) params.append('search', search);
    if (sort) params.append('sort', sort);
    if (order) params.append('order', order);

    const response = await fetch(`/api/projects?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data from Stein API');
    }

    const data: ProjectListResponse = await response.json();

    return {
      data,
      currentPage: pageParam,
      nextPage: data.pagination.hasMore ? pageParam + 1 : null,
    };
  } catch (error) {
    console.error('Error fetching data from Stein API:', error);
    throw error;
  }
}

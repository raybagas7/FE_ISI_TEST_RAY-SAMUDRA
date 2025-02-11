import { fetchProjects } from '@/lib/services';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useProjectList = ({
  pageParam,
  search,
  sort,
  order,
  limit,
}: {
  pageParam: number;
  search: string;
  sort: string;
  order: string;
  limit: number;
}) => {
  const projectList = useInfiniteQuery({
    queryKey: ['projects', pageParam, search, sort, order, limit],
    queryFn: ({ pageParam }) =>
      fetchProjects({ pageParam, search, sort, order, limit }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  return projectList;
};

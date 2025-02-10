export interface Project {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: string;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ProjectListResponse {
  projects: Project[];
  pagination: Pagination;
}

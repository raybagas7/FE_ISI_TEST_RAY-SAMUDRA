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

export interface TeamUser {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ProjectMember {
  userId: string;
  name: string;
  email: string;
  role: string;
}

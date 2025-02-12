export type Status = 'NOT_STARTED' | 'ON_PROGRESS' | 'DONE' | 'REJECT';
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
  role: 'LEAD' | 'TEAM';
}

export interface CreateTaskBody {
  title: string;
  description: string;
  projectId: string;
  dueDate: Date | undefined;
  assignedTo: string;
}

export interface UpdateTaskStatus {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  notes?: string;
}

export interface TaskDetail {
  taskId: string;
  title: string;
  description: string;
  status: Status;
  projectId: string;
  createdBy: string;
  assignedTo: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'TEAM' | 'LEAD';
  };
}

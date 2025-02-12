import {
  CreateTaskBody,
  ProjectMember,
  TaskDetail,
  TeamUser,
  UpdateTaskStatus,
} from '@/interface/dto';
import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

const responseBody = <T>(response: AxiosResponse<T>): T => response.data;

const request = {
  get: async (url: string, params?: Record<string, string | number>) => {
    return api.get(url, { params }).then(responseBody);
  },
  post: async (
    url: string,
    body?: Record<string, any>,
    params?: Record<string, string | number>
  ) => {
    return api.post(url, body, { params }).then(responseBody);
  },
  put: async (
    url: string,
    body?: Record<string, any>,
    params?: Record<string, string | number>
  ) => {
    return api.put(url, body, { params }).then(responseBody);
  },
  delete: async (url: string, params?: Record<string, string | number>) => {
    return api.delete(url, { params }).then(responseBody);
  },
};

const Project = {
  getAllProject: (params: Record<string, string | number>) => {
    return request.get('/projects', params);
  },
};

const Task = {
  getTasks: (
    id: string,
    params: Record<string, string | number>
  ): Promise<{ tasks: TaskDetail[] }> => {
    return request.get(`/projects/${id}/tasks`, params);
  },
  postCreateTaks: (body: CreateTaskBody): Promise<TaskDetail> => {
    return request.post('/task', body);
  },
  putChangeTaskStatus: (body: UpdateTaskStatus): Promise<any> => {
    console.log(body);

    return request.put('/task', body);
  },
};

const User = {
  getTeamUserByEmail: (params: Record<string, string>) => {
    return request.get(`/user/check`, params);
  },
  postAssignUserToProject: (body: Record<string, any>): Promise<TeamUser> => {
    return request.post(`/project/assign`, body);
  },
  getUserByProjectId: (
    params: Record<string, any>
  ): Promise<ProjectMember[]> => {
    return request.get('/project/assign', params);
  },
};
const agent = {
  Project,
  Task,
  User,
};

export default agent;

import { TeamUser } from '@/interface/dto';
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
};

const Project = {
  getAllProject: (params: Record<string, string | number>) => {
    return request.get('/projects', params);
  },
};

const Task = {
  getTasks: (id: string, params: Record<string, string | number>) => {
    return request.get(`projects/${id}/tasks`, params);
  },
};

const User = {
  getTeamUserByEmail: (params: Record<string, string>): Promise<TeamUser> => {
    return request.get(`/user/check`, params);
  },
};

const agent = {
  Project,
  Task,
  User,
};

export default agent;

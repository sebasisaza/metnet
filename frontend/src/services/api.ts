import type { Task, CreateTaskData, UpdateTaskData } from '../types/task';

// Interface for backend response data (Mongoose uses _id)
export interface BackendTaskData {
  _id: string
  title: string
  description: string
  status: 'pending' | 'completed'
  createdAt: string
  updatedAt: string
}

interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Task API methods
  async getTasks(params: Record<string, any> = {}): Promise<ApiResponse<BackendTaskData[]>> {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `?${queryString}` : '';
    return this.request(`/tasks${endpoint}`);
  }

  async getTask(id: string): Promise<ApiResponse<BackendTaskData>> {
    return this.request(`/tasks/${id}`);
  }

  async createTask(taskData: CreateTaskData): Promise<ApiResponse<BackendTaskData>> {
    return this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  }

  async updateTask(id: string, taskData: UpdateTaskData): Promise<ApiResponse<BackendTaskData>> {
    return this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    return this.request(`/tasks/${id}`, {
      method: 'DELETE',
    });
  }

  // Health check
  async healthCheck(): Promise<any> {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return fetch(`${baseURL}/health`).then(res => res.json());
  }
}

export default new ApiService();

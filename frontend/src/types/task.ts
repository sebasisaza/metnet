export interface Task {
  id: string
  title: string
  description: string
  status: 'pending' | 'completed'
  createdAt: Date
  updatedAt: Date
}

export type TaskStatus = Task['status']

export interface CreateTaskData {
  title: string
  description: string
  status?: 'pending' | 'completed'
}

export interface UpdateTaskData {
  title?: string
  description?: string
  status?: 'pending' | 'completed'
}

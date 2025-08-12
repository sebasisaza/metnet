import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskStatus, CreateTaskData, UpdateTaskData } from '@/types/task'
import apiService, { type BackendTaskData } from '@/services/api'

export const useTaskStore = defineStore('tasks', () => {
  // Initialize with empty arrays/values
  const tasks = ref<Task[]>([])
  const filter = ref<'all' | TaskStatus>('all')
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties for task counts
  const pendingTasksCount = computed(() => 
    tasks.value.filter(task => task.status === 'pending').length
  )

  const completedTasksCount = computed(() => 
    tasks.value.filter(task => task.status === 'completed').length
  )

  // Helper function to convert backend data to frontend Task
  const mapBackendToTask = (backendTask: BackendTaskData): Task => ({
    id: backendTask._id,
    title: backendTask.title,
    description: backendTask.description,
    status: backendTask.status,
    createdAt: new Date(backendTask.createdAt),
    updatedAt: new Date(backendTask.updatedAt)
  })

  // Actions
  const fetchTasks = async (status?: 'all' | TaskStatus) => {
    loading.value = true
    error.value = null
    try {
      const params = status && status !== 'all' ? { status } : {}
      const response = await apiService.getTasks(params)
      
      if (response.success) {
        const mappedTasks = response.data.map((task: BackendTaskData) => mapBackendToTask(task))
        tasks.value = mappedTasks
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch tasks'
    } finally {
      loading.value = false
    }
  }

  const addTask = async (taskData: CreateTaskData) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.createTask(taskData)
      if (response.success) {
        const newTask = mapBackendToTask(response.data)
        tasks.value.push(newTask)
        return newTask
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create task'
      console.error('Error creating task:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    loading.value = true
    error.value = null
    try {
      const updateData: UpdateTaskData = { status }
      const response = await apiService.updateTask(id, updateData)
      if (response.success) {
        const task = tasks.value.find(t => t.id === id)
        if (task) {
          task.status = status
          task.updatedAt = new Date(response.data.updatedAt)
        }
      } else {
        throw new Error(response.message || 'Failed to update task')
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to update task'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTask = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiService.deleteTask(id)
      if (response.success) {
        const index = tasks.value.findIndex(t => t.id === id)
        if (index > -1) {
          tasks.value.splice(index, 1)
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to delete task'
      console.error('Error deleting task:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilter = async (newFilter: 'all' | TaskStatus) => {
    filter.value = newFilter
    
    // Fetch tasks with the new filter
    if (newFilter === 'all') {
      await fetchTasks()
    } else {
      await fetchTasks(newFilter)
    }
  }

  const refreshTasks = async () => {
    tasks.value = [] // Clear existing tasks
    
    // Fetch tasks with current filter
    if (filter.value === 'all') {
      await fetchTasks()
    } else {
      await fetchTasks(filter.value)
    }
  }

  return {
    tasks,
    filter,
    loading,
    error,
    pendingTasksCount,
    completedTasksCount,
    fetchTasks,
    refreshTasks,
    addTask,
    updateTaskStatus,
    deleteTask,
    setFilter
  }
})

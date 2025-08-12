import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, TaskStatus, CreateTaskData } from '@/types/task'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>([])
  const filter = ref<TaskStatus | 'all'>('all')

  // Computed properties
  const filteredTasks = computed(() => {
    if (filter.value === 'all') {
      return tasks.value
    }
    return tasks.value.filter(task => task.status === filter.value)
  })

  const pendingTasksCount = computed(() => 
    tasks.value.filter(task => task.status === 'pending').length
  )

  const completedTasksCount = computed(() => 
    tasks.value.filter(task => task.status === 'completed').length
  )

  // Actions
  const addTask = (taskData: CreateTaskData) => {
    const newTask: Task = {
      id: generateId(),
      ...taskData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    tasks.value.push(newTask)
  }

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = status
      task.updatedAt = new Date()
    }
  }

  const deleteTask = (id: string) => {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index > -1) {
      tasks.value.splice(index, 1)
    }
  }

  const setFilter = (newFilter: TaskStatus | 'all') => {
    filter.value = newFilter
  }

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  return {
    tasks,
    filter,
    filteredTasks,
    pendingTasksCount,
    completedTasksCount,
    addTask,
    updateTaskStatus,
    deleteTask,
    setFilter
  }
})

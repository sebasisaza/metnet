<template>
  <div class="task-list">
          <div class="task-list-header">
        <h2>Mis Tareas</h2>
        <div class="header-actions">
          <router-link to="/create" class="btn btn-primary">
            <span>+</span> Agregar Nueva Tarea
          </router-link>
        </div>
      </div>

    <div class="filter-section">
      <div class="filter-buttons">
        <button 
          @click="handleFilterChange('all')" 
          :class="['filter-btn', { active: taskStore.filter === 'all' }]"
          :disabled="taskStore.loading"
        >
          Todas ({{ taskStore.tasks.length }})
        </button>
        <button 
          @click="handleFilterChange('pending')" 
          :class="['filter-btn', { active: taskStore.filter === 'pending' }]"
          :disabled="taskStore.loading"
        >
          Pendientes ({{ taskStore.pendingTasksCount }})
        </button>
        <button 
          @click="handleFilterChange('completed')" 
          :class="['filter-btn', { active: taskStore.filter === 'completed' }]"
          :disabled="taskStore.loading"
        >
          Completadas ({{ taskStore.completedTasksCount }})
        </button>
      </div>
      

    </div>

    <div class="tasks-container">
      <!-- Loading state -->
      <div v-if="taskStore.loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading tasks...</p>
      </div>

      <!-- Error state -->
      <div v-else-if="taskStore.error" class="error-state">
        <p class="error-message">{{ taskStore.error }}</p>
        <button @click="refreshTasks" class="btn btn-primary">Retry</button>
      </div>

      <!-- No tasks state -->
      <div v-else-if="taskStore.tasks.length === 0" class="no-tasks">
        <p>No tareas encontradas.</p>
      </div>
      
      <!-- Tasks grid -->
      <div v-else class="task-grid">
        <TaskCard 
          v-for="task in taskStore.tasks" 
          :key="task.id" 
          :task="task"
          @status-change="updateTaskStatus"
          @delete="deleteTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import TaskCard from '@/components/TaskCard.vue'
import type { TaskStatus } from '@/types/task'

const taskStore = useTaskStore()

const { 
  refreshTasks,
  updateTaskStatus,
  deleteTask,
  setFilter
} = taskStore



// Handle filter changes with error handling
const handleFilterChange = async (filterType: 'all' | 'pending' | 'completed') => {
  try {
    await setFilter(filterType)
  } catch (error) {
    console.error('Error changing filter:', error)
  }
}

// Fetch tasks when component mounts
onMounted(() => {
  // Ensure filter is set to 'all' by default
  setFilter('all')
  
  // Fetch tasks
  refreshTasks()
})


</script>

<style scoped>
.task-list {
  max-width: 1000px;
  margin: 0 auto;
}

.task-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.header-actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.filter-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.filter-btn.active {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.task-list-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.btn-secondary:hover:not(:disabled) {
  background: #e9ecef;
  color: #495057;
}

.btn-secondary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}



.tasks-container {
  min-height: 400px;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  color: #666;
}

.loading-state .spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-state {
  text-align: center;
  padding: 3rem;
  color: #dc3545;
}

.error-message {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.no-tasks {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
}

.task-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .task-list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .task-grid {
    grid-template-columns: 1fr;
  }
}
</style>

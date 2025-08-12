<template>
  <div class="task-list">
    <div class="task-list-header">
      <h2>Mis Tareas</h2>
      <router-link to="/create" class="btn btn-primary">
        <span>+</span> Agregar Nueva Tarea
      </router-link>
    </div>

    <div class="filter-section">
      <div class="filter-buttons">
        <button 
          @click="setFilter('all')" 
          :class="['filter-btn', { active: filter === 'all' }]"
        >
          Todas ({{ tasks.length }})
        </button>
        <button 
          @click="setFilter('pending')" 
          :class="['filter-btn', { active: filter === 'pending' }]"
        >
          Pendientes ({{ pendingTasksCount }})
        </button>
        <button 
          @click="setFilter('completed')" 
          :class="['filter-btn', { active: filter === 'completed' }]"
        >
          Completadas ({{ completedTasksCount }})
        </button>
      </div>
    </div>

    <div class="tasks-container">
      <div v-if="filteredTasks.length === 0" class="no-tasks">
        <p>No Tareas Encontradas.</p>
      </div>
      
      <div v-else class="task-grid">
        <TaskCard 
          v-for="task in filteredTasks" 
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
import { useTaskStore } from '@/stores/taskStore'
import TaskCard from '@/components/TaskCard.vue'
import type { TaskStatus } from '@/types/task'

const taskStore = useTaskStore()

const { 
  filteredTasks, 
  filter, 
  tasks, 
  pendingTasksCount, 
  completedTasksCount,
  setFilter,
  updateTaskStatus,
  deleteTask
} = taskStore
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

.tasks-container {
  min-height: 400px;
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

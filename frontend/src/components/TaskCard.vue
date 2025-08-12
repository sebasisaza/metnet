<template>
  <div class="task-card" :class="{ completed: task.status === 'completed' }">
    <div class="task-header">
      <div class="title-section">
        <div class="task-status-badge">
          {{ task.status === 'completed' ? 'Completada' : 'Pendiente' }}
        </div>
        
      </div>
      <div class="task-actions">
        <button 
          @click="toggleStatus" 
          :class="['status-btn', task.status === 'completed' ? 'completed' : 'pending']"
          :title="task.status === 'completed' ? 'Mark as pending' : 'Mark as completed'"
        >
          <span v-if="task.status === 'completed'" class="status-icon">⏪</span>
          <span v-else class="status-icon">✅</span>
        </button>
        <button 
          @click="handleDelete" 
          class="delete-btn"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
    <div>
      <h3 class="task-title">{{ task.title }}</h3>
    </div>
    <p v-if="task.description" class="task-description">
      {{ task.description }}
    </p>
    
    <div class="task-meta">
      <span class="task-date">
        Created: {{ formatDate(task.createdAt) }}
      </span>
      <span v-if="task.updatedAt !== task.createdAt" class="task-date">
        Updated: {{ formatDate(task.updatedAt) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task, TaskStatus } from '@/types/task'

interface Props {
  task: Task
}

interface Emits {
  (e: 'status-change', id: string, status: TaskStatus): void
  (e: 'delete', id: string): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const toggleStatus = async () => {
  const newStatus: TaskStatus = props.task.status === 'completed' ? 'pending' : 'completed'
  try {
    await emit('status-change', props.task.id, newStatus)
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}

const handleDelete = async () => {
  if (confirm('Seguro quiere eliminar la tarea?')) {
    try {
      await emit('delete', props.task.id)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.task-card.completed {
  border-color: #28a745;
  background: linear-gradient(135deg, #f8fff9 0%, #e8f5e8 100%);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  padding-right: 1rem;
}

.task-title {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.status-btn, .delete-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
}

.status-btn.pending {
  color: #6c757d;
}

.status-btn.pending:hover {
  background: #e9ecef;
  color: #495057;
}

.status-btn.completed {
  color: #28a745;
}

.status-btn.completed:hover {
  background: #d4edda;
  color: #155724;
}

.status-icon {
  font-size: 1.2rem;
  line-height: 1;
}

.delete-btn {
  color: #dc3545;
}

.delete-btn:hover {
  background: #f8d7da;
  color: #721c24;
}

.task-description {
  color: #666;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  word-wrap: break-word;
}

.task-meta {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.task-date {
  font-size: 0.85rem;
  color: #888;
}

.task-status-badge {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;
}

.task-card.completed .task-status-badge {
  background: #28a745;
}

@media (max-width: 480px) {
  .task-card {
    padding: 1rem;
  }
  
  .task-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .task-title {
    padding-right: 0;
  }
  
  .task-actions {
    justify-content: flex-end;
  }
}
</style>

<template>
  <div class="create-task">
    <div class="create-task-header">
      <h2>Crear Nueva Tarea</h2>
      <router-link to="/" class="btn btn-secondary">
        ← Regresar a Tareas
      </router-link>
    </div>

    <form @submit.prevent="handleSubmit" class="task-form">
      <div class="form-group">
        <label for="title">Titulo de Tarea *</label>
        <input
          id="title"
          v-model="form.title"
          type="text"
          placeholder="Ingresa el titulo de la tarea"
          required
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Ingresa la descripción de la tarea"
          rows="4"
          class="form-input"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="button" @click="$router.push('/')" class="btn btn-secondary">
          Cancelar
        </button>
        <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
          {{ isSubmitting ? 'Creando...' : 'Crear Tarea' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTaskStore } from '@/stores/taskStore'
import type { CreateTaskData } from '@/types/task'

const router = useRouter()
const taskStore = useTaskStore()

const form = ref<CreateTaskData>({
  title: '',
  description: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.title.trim()) return
  
  isSubmitting.value = true
  
  try {
    await taskStore.addTask({
      title: form.value.title.trim(),
      description: form.value.description.trim()
    })
    
    // Reset form
    form.value = { title: '', description: '' }
    
    // Redirect to task list
    router.push('/')
  } catch (error) {
    console.error('Error creating task:', error)
    // You could show an error message to the user here
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.create-task {
  max-width: 600px;
  margin: 0 auto;
}

.create-task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.create-task-header h2 {
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

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c757d;
  border: 1px solid #dee2e6;
}

.btn-secondary:hover {
  background: #e9ecef;
  color: #495057;
}

.task-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
}

textarea.form-input {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f0f0f0;
}

@media (max-width: 768px) {
  .create-task-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    justify-content: center;
  }
}
</style>

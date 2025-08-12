import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '@/views/TaskList.vue'
import CreateTask from '@/views/CreateTask.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/create',
      name: 'CreateTask',
      component: CreateTask
    }
  ]
})

export default router

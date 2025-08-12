<template>
  <div id="app">
    <header class="app-header">
      <h1>Administrador de Tareas</h1>
    </header>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// Component logic here
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
}

.app-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
</style>

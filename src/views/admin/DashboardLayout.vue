<template>
    <div class="app-container">
      <Sidebar />
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Admin/Sidebar.vue';
  </script>
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .app-container {
    display: flex;
    min-height: 100vh;
    background-color: #f8f9fa;
  }
  
  .main-content {
    flex: 1;
    padding: 20px 30px;
    overflow-y: auto;
  }
  </style>
<template>
  <div class="app-container">
    <Sidebar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Admin/Dashboard/Sidebar.vue";
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100%;
  background-color: #f8f9fa;
  overflow-x: none;
}
</style>

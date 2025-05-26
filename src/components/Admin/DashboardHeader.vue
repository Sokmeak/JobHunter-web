<template>
    <header class="dashboard-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="title">Dashboard</h1>
          <p class="welcome-message">
            Welcome back, {{ dashboardData.username }}! Here is what's happening on 
            <span class="highlight">JobHunter</span> Today.
          </p>
        </div>
        <div class="actions">
          <button class="action-button">
            <Calendar class="button-icon" />
            <span>Today</span>
          </button>
          <button class="action-button">
            <RefreshCw class="button-icon" />
            <span>Refresh</span>
          </button>
          <button class="action-button">
            <Download class="button-icon" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { inject } from 'vue';
  import { Calendar, RefreshCw, Download } from 'lucide-vue-next';
  
  const dashboardData = inject('dashboardData');
  </script>
  
  <style scoped>
  .dashboard-header {
    margin-bottom: 20px;
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .title-section {
    flex: 1;
  }
  
  .title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
  }
  
  .welcome-message {
    color: #6b7280;
    font-size: 14px;
  }
  
  .highlight {
    color: #4f46e5;
    font-weight: 500;
  }
  
  .actions {
    display: flex;
    gap: 10px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .action-button:hover {
    background-color: #f9fafb;
  }
  
  .button-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  @media (max-width: 640px) {
    .header-content {
      flex-direction: column;
    }
    
    .actions {
      width: 100%;
      justify-content: flex-start;
    }
  }
  </style>
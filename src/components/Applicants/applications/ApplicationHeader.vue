<template>
    <div class="application-header">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 class="mb-1">Keep it up, {{ userName }}</h4>
          <p class="text-muted mb-0">Here is job applications status from July 19 - July 25.</p>
        </div>
        <div class="date-picker d-flex align-items-center">
          <span>{{ dateRange }}</span>
          <i class="bi bi-calendar ms-2"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ApplicationHeader',
    props: {
      userName: {
        type: String,
        required: true
      },
      dateRange: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .application-header {
    margin-bottom: 20px;
  }
  
  .date-picker {
    padding: 8px 15px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    background-color: white;
  }
  </style>
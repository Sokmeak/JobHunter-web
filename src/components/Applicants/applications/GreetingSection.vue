<template>
    <div class="card border-0 mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2 class="fw-bold mb-2">Good morning, {{ userName }}</h2>
            <p class="text-muted mb-0">
              Here is what's happening with your job search applications from {{ dateRange.start }} - {{ dateRange.end }}.
            </p>
          </div>
          <div class="border rounded d-flex align-items-center px-3 py-2">
            <span>{{ dateRange.start }} - {{ dateRange.end }}</span>
            <i class="bi bi-calendar ms-2 text-primary"></i>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    userName: {
      type: String,
      required: true
    },
    dateRange: {
      type: Object,
      required: true
    }
  })
  </script>
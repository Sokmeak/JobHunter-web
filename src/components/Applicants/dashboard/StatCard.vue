<template>
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title text-muted">{{ title }}</h5>
        <div class="d-flex align-items-center mt-3">
          <h1 class="display-4 fw-bold mb-0">{{ value }}</h1>
          <div class="ms-auto">
            <i :class="`bi bi-${icon} fs-1 ${iconColor}`"></i>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    iconColor: {
      type: String,
      default: 'text-secondary'
    }
  })
  </script>
  <style scoped>
  .card-body{
    border:1px solid #D6DDEB;
    transition: transform 0.2s ease;
  }
  </style>
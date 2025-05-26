<template>
    <div class="stat-card">
      <div class="card-header">
        <h3 class="card-title">{{ title }}</h3>
        <component :is="icon" class="card-icon" />
      </div>
      <div class="card-value">{{ value }}</div>
      <div class="card-footer" :class="changeTypeClass">
        <span>{{ change }}</span>
        <span v-if="changeText">{{ changeText }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    change: {
      type: String,
      default: ''
    },
    changeText: {
      type: String,
      default: ''
    },
    changeType: {
      type: String,
      default: 'neutral'
    },
    icon: {
      type: Object,
      required: true
    }
  });
  
  const changeTypeClass = computed(() => {
    return {
      'positive': props.changeType === 'positive',
      'negative': props.changeType === 'negative',
      'warning': props.changeType === 'warning',
      'neutral': props.changeType === 'neutral'
    };
  });
  </script>
  
  <style scoped>
  .stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .card-title {
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
  }
  
  .card-icon {
    width: 20px;
    height: 20px;
    color: #9ca3af;
  }
  
  .card-value {
    font-size: 28px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 8px;
  }
  
  .card-footer {
    font-size: 13px;
  }
  
  .card-footer.positive {
    color: #10b981;
  }
  
  .card-footer.negative {
    color: #ef4444;
  }
  
  .card-footer.warning {
    color: #ef4444;
  }
  
  .card-footer.neutral {
    color: #f59e0b;
  }
  </style>
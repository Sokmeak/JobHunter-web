<template>
    <div class="approval-item">
      <div class="approval-content">
        <div class="approval-header">
          <div class="company-name">
            {{ company }}
            <span class="priority-badge" :class="priorityClass">{{ priority }}</span>
          </div>
        </div>
        <div class="approval-type">{{ type }}</div>
        <div class="approval-time">{{ time }}</div>
      </div>
      <div class="approval-actions">
        <button class="approve-button" @click="$emit('approve')">
          <Check class="action-icon" />
        </button>
        <button class="reject-button" @click="$emit('reject')">
          <X class="action-icon" />
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { Check, X } from 'lucide-vue-next';
  
  const props = defineProps({
    company: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      default: 'medium'
    },
    time: {
      type: String,
      required: true
    }
  });
  
  defineEmits(['approve', 'reject']);
  
  const priorityClass = computed(() => {
    return {
      'priority-low': props.priority === 'low',
      'priority-medium': props.priority === 'medium',
      'priority-high': props.priority === 'high'
    };
  });
  </script>
  
  <style scoped>
  .approval-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .approval-item:last-child {
    border-bottom: none;
  }
  
  .approval-content {
    flex: 1;
  }
  
  .approval-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  
  .company-name {
    font-weight: 500;
    color: #111827;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .priority-badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
  }
  
  .priority-low {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .priority-medium {
    background-color: #fffbeb;
    color: #f59e0b;
  }
  
  .priority-high {
    background-color: #fee2e2;
    color: #ef4444;
  }
  
  .approval-type {
    color: #6b7280;
    font-size: 13px;
    margin-bottom: 4px;
  }
  
  .approval-time {
    color: #9ca3af;
    font-size: 12px;
  }
  
  .approval-actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
  
  .approve-button, .reject-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .approve-button {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .approve-button:hover {
    background-color: #d1fae5;
  }
  
  .reject-button {
    background-color: #fee2e2;
    color: #ef4444;
  }
  
  .reject-button:hover {
    background-color: #fecaca;
  }
  
  .action-icon {
    width: 16px;
    height: 16px;
  }
  </style>
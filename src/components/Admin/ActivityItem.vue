<template>
    <div class="activity-item">
      <div class="avatar">
        <img :src="avatar" :alt="user" />
      </div>
      <div class="activity-content">
        <div class="activity-header">
          <span class="user-name">{{ user }}</span>
          <span class="activity-time">{{ time }}</span>
        </div>
        <p class="activity-description">{{ action }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    user: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    action: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .activity-item {
    display: flex;
    padding: 12px 0;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .activity-item:last-child {
    border-bottom: none;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 12px;
    flex-shrink: 0;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .activity-content {
    flex: 1;
  }
  
  .activity-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
  }
  
  .user-name {
    font-weight: 500;
    color: #111827;
    font-size: 14px;
  }
  
  .activity-time {
    color: #9ca3af;
    font-size: 12px;
  }
  
  .activity-description {
    color: #6b7280;
    font-size: 13px;
  }
  </style>
<template>
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-background"></div>
        <div class="profile-info">
          <div class="avatar-container">
            <img :src="user.avatar" :alt="user.name" class="profile-avatar" />
          </div>
          <div class="user-details">
            <h2 class="user-name">{{ user.name }}</h2>
            <p class="user-title">{{ user.title }}</p>
            <div class="user-location">
              <MapPin class="location-icon" />
              <span>{{ user.location }}</span>
            </div>
            <div class="user-status">
              <span class="status-badge">{{ user.status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { MapPin } from 'lucide-vue-next';
  
  defineProps({
    user: {
      type: Object,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .profile-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
  }
  
  .profile-header {
    position: relative;
  }
  
  .profile-background {
    height: 120px;
    background: linear-gradient(135deg, #fce7f3 0%, #e879f9 50%, #7c3aed 100%);
  }
  
  .profile-info {
    display: flex;
    align-items: flex-end;
    gap: 20px;
    padding: 0 24px 24px;
    margin-top: -40px;
    position: relative;
  }
  
  .avatar-container {
    flex-shrink: 0;
  }
  
  .profile-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 4px solid white;
    object-fit: cover;
    background-color: #f3f4f6;
  }
  
  .user-details {
    flex: 1;
    padding-top: 40px;
  }
  
  .user-name {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
  }
  
  .user-title {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 8px 0;
  }
  
  .user-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 12px;
  }
  
  .location-icon {
    width: 14px;
    height: 14px;
  }
  
  .user-status {
    display: flex;
  }
  
  .status-badge {
    padding: 4px 12px;
    background-color: #d1fae5;
    color: #065f46;
    border-radius: 16px;
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  @media (max-width: 768px) {
    .profile-info {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      padding: 0 20px 20px;
    }
    
    .user-details {
      padding-top: 0;
    }
  }
  </style>
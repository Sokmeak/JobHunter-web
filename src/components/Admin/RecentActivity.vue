<template>
    <div class="recent-activity">
      <h2 class="section-title">Recent Activity</h2>
      <div class="activity-list">
        <ActivityItem 
          v-for="(activity, index) in activities" 
          :key="index"
          :user="activity.user"
          :avatar="activity.avatar"
          :action="activity.action"
          :time="activity.time"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ActivityItem from './ActivityItem.vue';
  
  const activities = ref([
    {
      user: 'Jan Mayer',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '12 mins ago'
    },
    {
      user: 'Ally Wales',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '30mins ago'
    },
    {
      user: 'James Gardner',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '50 mins ago'
    },
    {
      user: 'Allison Geidt',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '1 hour ago'
    },
    {
      user: 'Ruben Culhane',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '1 hour ago'
    },
    {
      user: 'Lydia Diaz',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '1 hour ago'
    },
    {
      user: 'James Dokidis',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '1 hour ago'
    },
    {
      user: 'Angelina Swann',
      avatar: '/placeholder.svg?height=40&width=40',
      action: 'Created a job new posting Senior Reach Developer',
      time: '1 hour ago'
    }
  ]);
  </script>
  
  <style scoped>
  .recent-activity {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    height: 100%;
  }
  
  .section-title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 16px;
  }
  
  .activity-list {
    display: flex;
    flex-direction: column;
  }
  </style>
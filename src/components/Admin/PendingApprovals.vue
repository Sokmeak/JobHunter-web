<template>
    <div class="pending-approvals">
      <h2 class="section-title">Pending Approvals</h2>
      <div class="approvals-list">
        <ApprovalItem 
          v-for="(approval, index) in approvals" 
          :key="index"
          :company="approval.company"
          :type="approval.type"
          :priority="approval.priority"
          :time="approval.time"
          @approve="approveItem(index)"
          @reject="rejectItem(index)"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import ApprovalItem from './ApprovalItem.vue';
  
  const approvals = ref([
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'medium',
      time: 'Today, 10:23 AM',
      status: 'pending'
    },
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'high',
      time: 'Today, 10:23 AM',
      status: 'pending'
    },
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'low',
      time: 'Today, 10:23 AM',
      status: 'pending'
    },
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'medium',
      time: 'Today, 10:23 AM',
      status: 'pending'
    },
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'low',
      time: 'Today, 10:23 AM',
      status: 'pending'
    },
    {
      company: 'Acme Solution',
      type: 'Employer Verification',
      priority: 'low',
      time: 'Today, 10:23 AM',
      status: 'pending'
    }
  ]);
  
  const approveItem = (index) => {
    approvals.value[index].status = 'approved';
    // In a real app, you would make an API call here
    console.log(`Approved: ${approvals.value[index].company}`);
  };
  
  const rejectItem = (index) => {
    approvals.value[index].status = 'rejected';
    // In a real app, you would make an API call here
    console.log(`Rejected: ${approvals.value[index].company}`);
  };
  </script>
  
  <style scoped>
  .pending-approvals {
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
  
  .approvals-list {
    display: flex;
    flex-direction: column;
  }
  </style>
<template>
    <tr class="content-row" :class="{ 'reported': content.status === 'Reported' }">
      <td class="content-cell">
        <div class="content-info">
          <div class="content-title">{{ content.title }}</div>
          <div class="content-company">{{ content.company }}</div>
        </div>
      </td>
      
      <td class="type-cell">
        <span class="type-badge" :class="getTypeClass(content.type)">
          {{ content.type }}
        </span>
      </td>
      
      <td class="status-cell">
        <span class="status-badge" :class="getStatusClass(content.status)">
          {{ content.status }}
        </span>
      </td>
      
      <td class="reports-cell">
        <div v-if="content.reports > 0" class="reports-info">
          <AlertTriangle class="reports-icon" />
          <span class="reports-count">{{ content.reports }}</span>
        </div>
        <span v-else class="no-reports">None</span>
      </td>
      
      <td class="date-cell">
        {{ content.date }}
      </td>
      
      <td class="actions-cell">
        <div class="actions-dropdown" @click="toggleActionsMenu">
          <MoreHorizontal class="actions-icon" />
          <div v-if="showActionsMenu" class="actions-menu">
            <button @click="handleAction('view')" class="action-item">
              <Eye class="action-icon" />
              <span>View Details</span>
            </button>
            <button @click="handleAction('edit')" class="action-item">
              <Edit class="action-icon" />
              <span>Edit Content</span>
            </button>
            <button 
              v-if="content.status !== 'Approved'" 
              @click="handleAction('approve')" 
              class="action-item"
            >
              <CheckCircle class="action-icon" />
              <span>Approve</span>
            </button>
            <button 
              v-if="content.status !== 'Rejected'" 
              @click="handleAction('reject')" 
              class="action-item"
            >
              <XCircle class="action-icon" />
              <span>Reject</span>
            </button>
            <button @click="handleAction('delete')" class="action-item danger">
              <Trash2 class="action-icon" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { 
    MoreHorizontal, 
    Eye, 
    Edit, 
    CheckCircle, 
    XCircle, 
    Trash2, 
    AlertTriangle 
  } from 'lucide-vue-next';
  
  const props = defineProps({
    content: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['action']);
  
  const showActionsMenu = ref(false);
  
  const getTypeClass = (type) => {
    return {
      'type-job': type === 'Job',
      'type-profile': type === 'Profile',
      'type-comment': type === 'Comment',
      'type-review': type === 'Review'
    };
  };
  
  const getStatusClass = (status) => {
    return {
      'status-reported': status === 'Reported',
      'status-pending': status === 'Pending',
      'status-approved': status === 'Approved',
      'status-rejected': status === 'Rejected'
    };
  };
  
  const toggleActionsMenu = () => {
    showActionsMenu.value = !showActionsMenu.value;
  };
  
  const handleAction = (action) => {
    emit('action', { content: props.content, action });
    showActionsMenu.value = false;
  };
  
  const handleClickOutside = (event) => {
    if (!event.target.closest('.actions-dropdown')) {
      showActionsMenu.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
  });
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  <style scoped>
  .content-row {
    transition: background-color 0.2s;
  }
  
  .content-row:hover {
    background-color: #f9fafb;
  }
  
  .content-row.reported {
    background-color: #fef2f2;
  }
  
  .content-row.reported:hover {
    background-color: #fee2e2;
  }
  
  .content-row td {
    padding: 16px;
    font-size: 14px;
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
  }
  
  .content-row:last-child td {
    border-bottom: none;
  }
  
  .content-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .content-title {
    font-weight: 500;
    color: #111827;
  }
  
  .content-company {
    font-size: 12px;
    color: #6b7280;
  }
  
  .type-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .type-job {
    background-color: #ecfdf5;
    color: #10b981;
  }
  
  .type-profile {
    background-color: #f3e8ff;
    color: #9333ea;
  }
  
  .type-comment {
    background-color: #e0f2fe;
    color: #0284c7;
  }
  
  .type-review {
    background-color: #fffbeb;
    color: #f59e0b;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-reported {
    background-color: #fee2e2;
    color: #ef4444;
  }
  
  .status-pending {
    background-color: #fffbeb;
    color: #f59e0b;
  }
  
  .status-approved {
    background-color: #dbeafe;
    color: #2563eb;
  }
  
  .status-rejected {
    background-color: #f3f4f6;
    color: #6b7280;
  }
  
  .reports-info {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #ef4444;
  }
  
  .reports-icon {
    width: 16px;
    height: 16px;
  }
  
  .reports-count {
    font-weight: 500;
    font-size: 12px;
  }
  
  .no-reports {
    color: #6b7280;
    font-size: 12px;
  }
  
  .actions-dropdown {
    position: relative;
    cursor: pointer;
  }
  
  .actions-icon {
    width: 16px;
    height: 16px;
    color: #6b7280;
  }
  
  .actions-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    z-index: 10;
    min-width: 160px;
    padding: 4px 0;
  }
  
  .action-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px 12px;
    font-size: 14px;
    color: #374151;
    background: none;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .action-item:hover {
    background-color: #f3f4f6;
  }
  
  .action-item.danger {
    color: #ef4444;
  }
  
  .action-item.danger:hover {
    background-color: #fee2e2;
  }
  
  .action-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  </style>
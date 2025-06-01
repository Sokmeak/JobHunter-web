<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">{{ getModalTitle() }}</h2>
          <button class="close-button" @click="closeModal">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-content">
          <div class="content-preview">
            <h3 class="content-title">{{ content.title }}</h3>
            <p class="content-company">{{ content.company }}</p>
            <div class="content-meta">
              <span class="content-type">{{ content.type }}</span>
              <span class="content-status" :class="getStatusClass(content.status)">
                {{ content.status }}
              </span>
              <span class="content-date">{{ content.date }}</span>
            </div>
            <p class="content-description">{{ content.description }}</p>
          </div>
          
          <div v-if="action === 'reject' || action === 'delete'" class="action-form">
            <label for="reason" class="form-label">
              {{ action === 'reject' ? 'Rejection Reason' : 'Deletion Reason' }}
            </label>
            <textarea
              id="reason"
              v-model="reason"
              class="form-textarea"
              :placeholder="`Please provide a reason for ${action}ing this content...`"
              rows="4"
              required
            ></textarea>
            
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="notifyUser"
                  class="checkbox-input"
                />
                <span class="checkbox-text">Notify the user about this action</span>
              </label>
            </div>
          </div>
          
          <div v-if="action === 'approve'" class="approval-info">
            <div class="info-message">
              <CheckCircle class="info-icon" />
              <p>This content will be approved and made visible to all users.</p>
            </div>
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="cancel-button" @click="closeModal">
            Cancel
          </button>
          <button 
            type="button" 
            class="confirm-button" 
            :class="getActionButtonClass()"
            @click="confirmAction"
            :disabled="!canConfirm"
          >
            {{ getActionButtonText() }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { X, CheckCircle } from 'lucide-vue-next';
  
  const props = defineProps({
    content: {
      type: Object,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  });
  
  const emit = defineEmits(['close', 'confirm']);
  
  const reason = ref('');
  const notifyUser = ref(true);
  
  const canConfirm = computed(() => {
    if (props.action === 'reject' || props.action === 'delete') {
      return reason.value.trim().length > 0;
    }
    return true;
  });
  
  const getModalTitle = () => {
    switch (props.action) {
      case 'approve': return 'Approve Content';
      case 'reject': return 'Reject Content';
      case 'delete': return 'Delete Content';
      case 'view': return 'View Content Details';
      case 'edit': return 'Edit Content';
      default: return 'Content Action';
    }
  };
  
  const getActionButtonText = () => {
    switch (props.action) {
      case 'approve': return 'Approve';
      case 'reject': return 'Reject';
      case 'delete': return 'Delete';
      default: return 'Confirm';
    }
  };
  
  const getActionButtonClass = () => {
    return {
      'approve': props.action === 'approve',
      'danger': props.action === 'reject' || props.action === 'delete'
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
  
  const closeModal = () => {
    emit('close');
  };
  
  const confirmAction = () => {
    const actionData = {
      action: props.action,
      reason: reason.value,
      notifyUser: notifyUser.value
    };
    
    emit('confirm', actionData);
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
  }
  
  .modal-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .modal-title {
    font-size: 18px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .close-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    border: none;
    background-color: #f9fafb;
    color: #6b7280;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .close-button:hover {
    background-color: #f3f4f6;
    color: #111827;
  }
  
  .close-icon {
    width: 16px;
    height: 16px;
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .content-preview {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .content-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
  }
  
  .content-company {
    font-size: 14px;
    color: #6b7280;
    margin-bottom: 12px;
  }
  
  .content-meta {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }
  
  .content-type {
    padding: 2px 8px;
    background-color: #ecfdf5;
    color: #10b981;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .content-status {
    padding: 2px 8px;
    border-radius: 12px;
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
  
  .content-date {
    font-size: 12px;
    color: #6b7280;
  }
  
  .content-description {
    font-size: 14px;
    color: #374151;
    line-height: 1.5;
  }
  
  .action-form {
    margin-top: 20px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }
  
  .form-textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    resize: vertical;
    min-height: 100px;
  }
  
  .form-textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
  
  .checkbox-group {
    margin-top: 16px;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .checkbox-input {
    margin-right: 8px;
  }
  
  .checkbox-text {
    font-size: 14px;
    color: #374151;
  }
  
  .approval-info {
    margin-top: 20px;
  }
  
  .info-message {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    background-color: #ecfdf5;
    border-radius: 8px;
    color: #10b981;
  }
  
  .info-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    padding: 20px 24px;
    border-top: 1px solid #e5e7eb;
  }
  
  .cancel-button {
    padding: 10px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background-color: white;
    color: #374151;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-button:hover {
    background-color: #f9fafb;
  }
  
  .confirm-button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .confirm-button.approve {
    background-color: #10b981;
    color: white;
  }
  
  .confirm-button.approve:hover:not(:disabled) {
    background-color: #059669;
  }
  
  .confirm-button.danger {
    background-color: #ef4444;
    color: white;
  }
  
  .confirm-button.danger:hover:not(:disabled) {
    background-color: #dc2626;
  }
  
  .confirm-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
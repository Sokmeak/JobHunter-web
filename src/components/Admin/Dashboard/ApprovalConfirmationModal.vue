<template>
    <div class="modal-overlay" @click="handleOverlayClick">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">{{ getModalTitle() }}</h2>
          <button class="close-button" @click="$emit('cancel')">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-content">
          <div class="approval-preview">
            <h3 class="approval-company">{{ approval.company }}</h3>
            <p class="approval-details">{{ approval.type }}</p>
            <div class="approval-meta">
              <span class="priority-badge" :class="`priority-${approval.priority}`">
                {{ approval.priority }} priority
              </span>
              <span class="approval-timestamp">{{ approval.timestamp }}</span>
            </div>
          </div>
          
          <div class="action-message">
            <div class="message-icon" :class="action">
              <Check v-if="action === 'approve'" class="icon" />
              <X v-else class="icon" />
            </div>
            <p class="message-text">{{ getActionMessage() }}</p>
          </div>
          
          <div v-if="action === 'refuse'" class="reason-section">
            <label for="refusalReason" class="reason-label">
              Reason for refusal (optional)
            </label>
            <textarea
              id="refusalReason"
              v-model="refusalReason"
              class="reason-textarea"
              placeholder="Please provide a reason for refusing this approval..."
              rows="3"
            ></textarea>
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" class="cancel-button" @click="$emit('cancel')">
            Cancel
          </button>
          <button 
            type="button" 
            class="confirm-button" 
            :class="action"
            @click="handleConfirm"
          >
            {{ getConfirmButtonText() }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { X, Check } from 'lucide-vue-next';
  
  const props = defineProps({
    approval: {
      type: Object,
      required: true
    },
    action: {
      type: String,
      required: true,
      validator: (value) => ['approve', 'refuse'].includes(value)
    }
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const refusalReason = ref('');
  
  const getModalTitle = () => {
    return props.action === 'approve' ? 'Approve Request' : 'Refuse Request';
  };
  
  const getActionMessage = () => {
    const company = props.approval.company;
    const type = props.approval.type.toLowerCase();
    
    if (props.action === 'approve') {
      return `Are you sure you want to approve ${company}'s ${type}? This action cannot be undone.`;
    } else {
      return `Are you sure you want to refuse ${company}'s ${type}? This action cannot be undone.`;
    }
  };
  
  const getConfirmButtonText = () => {
    return props.action === 'approve' ? 'Approve' : 'Refuse';
  };
  
  const handleConfirm = () => {
    const reason = props.action === 'refuse' ? refusalReason.value : '';
    emit('confirm', reason);
  };
  
  const handleOverlayClick = () => {
    emit('cancel');
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
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
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
  
  .approval-preview {
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
  }
  
  .approval-company {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
  }
  
  .approval-details {
    font-size: 14px;
    color: #6b7280;
    margin: 0 0 12px 0;
  }
  
  .approval-meta {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .priority-badge {
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .priority-high {
    background-color: #fee2e2;
    color: #dc2626;
  }
  
  .priority-medium {
    background-color: #fef3c7;
    color: #d97706;
  }
  
  .priority-low {
    background-color: #dbeafe;
    color: #2563eb;
  }
  
  .approval-timestamp {
    font-size: 12px;
    color: #9ca3af;
  }
  
  .action-message {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }
  
  .message-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .message-icon.approve {
    background-color: #dcfce7;
    color: #16a34a;
  }
  
  .message-icon.refuse {
    background-color: #fee2e2;
    color: #dc2626;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .message-text {
    font-size: 14px;
    color: #374151;
    margin: 0;
    line-height: 1.5;
  }
  
  .reason-section {
    margin-top: 20px;
  }
  
  .reason-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 8px;
  }
  
  .reason-textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    resize: vertical;
    font-family: inherit;
  }
  
  .reason-textarea:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
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
  
  .confirm-button.approve:hover {
    background-color: #059669;
  }
  
  .confirm-button.refuse {
    background-color: #ef4444;
    color: white;
  }
  
  .confirm-button.refuse:hover {
    background-color: #dc2626;
  }
  </style>
<template>
    <div class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <h2 class="modal-title">Add New User</h2>
          <button class="close-button" @click="closeModal">
            <X class="close-icon" />
          </button>
        </div>
        
        <form @submit.prevent="submitForm" class="modal-form">
          <div class="form-group">
            <label for="name" class="form-label">Full Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="form-input"
              placeholder="Enter full name"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="role" class="form-label">Role</label>
            <select id="role" v-model="form.role" class="form-select" required>
              <option value="">Select a role</option>
              <option value="Job Seekers">Job Seekers</option>
              <option value="Employer">Employer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="status" class="form-label">Status</label>
            <select id="status" v-model="form.status" class="form-select" required>
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                v-model="form.verified"
                class="checkbox-input"
              />
              <span class="checkbox-text">Verified User</span>
            </label>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="cancel-button" @click="closeModal">
              Cancel
            </button>
            <button type="submit" class="submit-button" :disabled="!isFormValid">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { X } from 'lucide-vue-next';
  
  const emit = defineEmits(['close', 'user-added']);
  
  const form = ref({
    name: '',
    email: '',
    role: '',
    status: '',
    verified: false
  });
  
  const isFormValid = computed(() => {
    return form.value.name && 
           form.value.email && 
           form.value.role && 
           form.value.status;
  });
  
  const closeModal = () => {
    emit('close');
  };
  
  const submitForm = () => {
    if (isFormValid.value) {
      emit('user-added', { ...form.value });
      closeModal();
    }
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
  
  .modal-form {
    padding: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }
  
  .form-input,
  .form-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.2s;
  }
  
  .form-input:focus,
  .form-select:focus {
    outline: none;
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
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
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    padding-top: 20px;
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
  
  .submit-button {
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    background-color: #4f46e5;
    color: white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .submit-button:hover:not(:disabled) {
    background-color: #4338ca;
  }
  
  .submit-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  </style>
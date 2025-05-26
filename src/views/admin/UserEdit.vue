<template>
    <div class="user-edit">
      <div class="page-header">
        <div class="back-button" @click="router.back()">
          <ChevronLeft class="back-icon" />
          <span>Back to Users</span>
        </div>
        <h1 class="page-title">Edit User</h1>
      </div>
      
      <div v-if="user" class="edit-form-container">
        <form @submit.prevent="saveUser" class="edit-form">
          <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            
            <div class="form-row">
              <div class="form-group">
                <label for="name" class="form-label">Full Name</label>
                <input
                  id="name"
                  v-model="user.name"
                  type="text"
                  class="form-input"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="email" class="form-label">Email Address</label>
                <input
                  id="email"
                  v-model="user.email"
                  type="email"
                  class="form-input"
                  required
                />
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="role" class="form-label">Role</label>
                <select id="role" v-model="user.role" class="form-select">
                  <option value="Job Seekers">Job Seekers</option>
                  <option value="Employer">Employer</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="status" class="form-label">Status</label>
                <select id="status" v-model="user.status" class="form-select">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label class="checkbox-label">
                <input
                  type="checkbox"
                  v-model="user.verified"
                  class="checkbox-input"
                />
                <span class="checkbox-text">Verified User</span>
              </label>
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-button" @click="router.back()">
              Cancel
            </button>
            <button type="submit" class="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
      
      <div v-else class="loading-state">
        <p>Loading user data...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { ChevronLeft } from 'lucide-vue-next';
  
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });
  
  const router = useRouter();
  const user = ref(null);
  
  const fetchUserData = (userId) => {
    // Simulate API call
    setTimeout(() => {
      // Mock user data
      user.value = {
        id: userId,
        name: 'Jonh Doe',
        email: 'jonhdoe@gmail.com',
        role: 'Job Seekers',
        status: 'Active',
        verified: true,
        joinDate: 'Jan 15, 2023'
      };
    }, 500);
  };
  
  const saveUser = () => {
    // Simulate API call to save user
    console.log('Saving user:', user.value);
    
    // Show success message and redirect
    alert('User updated successfully!');
    router.push(`/users/${props.id}`);
  };
  
  onMounted(() => {
    fetchUserData(props.id);
  });
  </script>
  
  <style scoped>
  .user-edit {
    max-width: 800px;
  }
  
  .page-header {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
  }
  
  .back-button {
    display: flex;
    align-items: center;
    color: #6b7280;
    cursor: pointer;
    font-size: 14px;
    width: fit-content;
  }
  
  .back-button:hover {
    color: #111827;
  }
  
  .back-icon {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
  }
  
  .edit-form-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    padding: 24px;
  }
  
  .form-section {
    margin-bottom: 32px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-label {
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }
  
  .form-input,
  .form-select {
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
    margin-top: 12px;
  }
  
  .checkbox-input {
    margin-right: 8px;
  }
  
  .checkbox-text {
    font-size: 14px;
    color: #374151;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
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
  
  .save-button {
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
  
  .save-button:hover {
    background-color: #4338ca;
  }
  
  .loading-state {
    display: flex;
    justify-content: center;
    padding: 40px;
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    .form-row {
      grid-template-columns: 1fr;
    }
    
    .form-actions {
      flex-direction: column;
    }
  }
  </style>
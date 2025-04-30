<!-- src/components/settings/AccountType.vue -->
<template>
    <div class="account-type-section mb-4">
      <h5 class="section-title">Account Type</h5>
      <p class="text-muted">You can update your account type</p>
      
      <div class="account-options mt-3">
        <div class="form-check mb-3">
          <input 
            class="form-check-input" 
            type="radio" 
            name="accountType" 
            id="jobSeeker" 
            value="Job Seeker" 
            v-model="selectedType"
          >
          <label class="form-check-label" for="jobSeeker">
            <div class="d-flex flex-column">
              <span class="fw-medium">Job Seeker</span>
              <small class="text-muted">Looking for a job</small>
            </div>
          </label>
        </div>
        
        <div class="form-check">
          <input 
            class="form-check-input" 
            type="radio" 
            name="accountType" 
            id="employer" 
            value="Employer" 
            v-model="selectedType"
          >
          <label class="form-check-label" for="employer">
            <div class="d-flex flex-column">
              <span class="fw-medium">Employer</span>
              <small class="text-muted">Hiring, sourcing candidates, or posting a jobs</small>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AccountType',
    props: {
      accountType: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        selectedType: this.accountType
      };
    },
    watch: {
      accountType(newValue) {
        this.selectedType = newValue;
      },
      selectedType(newValue) {
        this.$emit('account-type-updated', newValue);
      }
    }
  };
  </script>
  
  <style scoped>
  .form-check-label {
    cursor: pointer;
  }
  
  .form-check-input {
    cursor: pointer;
  }
  </style>
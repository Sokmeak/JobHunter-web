<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Experiences</h5>
        <div>
          <button 
            class="btn btn-link text-primary p-0 me-2"
            @click="showAddForm = !showAddForm"
          >
            <i :class="showAddForm ? 'bi bi-x-lg' : 'bi bi-plus-lg'"></i>
          </button>
        </div>
      </div>

      <!-- Add New Experience Form -->
      <div v-if="showAddForm" class="add-experience-form mb-4">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Add New Experience</h6>
            
            <div class="d-flex mb-3">
              <div class="company-logo me-3">
                <div class="logo-placeholder position-relative">
                  <img 
                    v-if="newExperience.logo"
                    :src="newExperience.logo" 
                    alt="Company Logo" 
                    class="rounded" 
                    width="50" 
                    height="50"
                  >
                  <div 
                    v-else
                    class="logo-placeholder-empty rounded d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-building text-muted"></i>
                  </div>
                  <input 
                    ref="newLogoInput"
                    type="file" 
                    accept="image/*" 
                    @change="handleNewLogoUpload"
                    class="d-none"
                  >
                  <button 
                    @click="$refs.newLogoInput.click()"
                    class="btn btn-sm btn-outline-primary mt-2"
                  >
                    <i class="bi bi-camera"></i> Upload Logo
                  </button>
                </div>
              </div>
              
              <div class="flex-grow-1">
                <div class="row mb-2">
                  <div class="col-md-6">
                    <input 
                      v-model="newExperience.title"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="Job Title"
                      required
                    >
                  </div>
                  <div class="col-md-6">
                    <input 
                      v-model="newExperience.company"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="Company"
                      required
                    >
                  </div>
                </div>
                
                <div class="row mb-2">
                  <div class="col-md-6">
                    <select 
                      v-model="newExperience.type"
                      class="form-select form-select-sm"
                      required
                    >
                      <option value="">Employment Type</option>
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <input 
                      v-model="newExperience.period"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="e.g., Jun 2019 - Present (1y 1m)"
                      required
                    >
                  </div>
                </div>
                
                <div class="mb-2">
                  <input 
                    v-model="newExperience.location"
                    type="text" 
                    class="form-control form-control-sm"
                    placeholder="Location"
                  >
                </div>
                
                <textarea 
                  v-model="newExperience.description"
                  class="form-control form-control-sm mb-3"
                  rows="3"
                  placeholder="Job description..."
                ></textarea>
                
                <div class="d-flex gap-2">
                  <button 
                    @click="addExperience"
                    class="btn btn-primary btn-sm"
                    :disabled="!isNewExperienceValid"
                  >
                    <i class="bi bi-plus"></i> Add Experience
                  </button>
                  <button 
                    @click="cancelAdd"
                    class="btn btn-outline-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Experience Items -->
      <experience-item 
        v-for="(experience, index) in experiences" 
        :key="index" 
        :experience="experience"
        @update="(updatedExp) => updateExperience(index, updatedExp)"
        @delete="deleteExperience(index)"
      />

      <button v-if="moreCount > 0" class="btn btn-link text-primary">
        Show {{ moreCount }} more experiences
      </button>
    </div>
  </div>
</template>

<script>
import ExperienceItem from './ExperienceItem.vue'

export default {
  name: 'ExperienceSection',
  components: {
    ExperienceItem
  },
  props: {
    experiences: {
      type: Array,
      required: true
    },
    moreCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      showAddForm: false,
      newExperience: {
        title: '',
        company: '',
        type: '',
        period: '',
        location: '',
        description: '',
        logo: ''
      }
    }
  },
  computed: {
    isNewExperienceValid() {
      return this.newExperience.title && 
             this.newExperience.company && 
             this.newExperience.type && 
             this.newExperience.period;
    }
  },
  methods: {
    addExperience() {
      if (this.isNewExperienceValid) {
        const experienceToAdd = { ...this.newExperience };
        
        // If no logo uploaded, use a default or company logo service
        if (!experienceToAdd.logo) {
          experienceToAdd.logo = `https://logo.clearbit.com/${experienceToAdd.company.toLowerCase().replace(/\s+/g, '')}.com`;
        }
        
        this.$emit('add-experience', experienceToAdd);
        this.resetNewExperience();
        this.showAddForm = false;
      }
    },
    updateExperience(index, updatedExperience) {
      this.$emit('update-experience', index, updatedExperience);
    },
    deleteExperience(index) {
      if (confirm('Are you sure you want to delete this experience?')) {
        this.$emit('delete-experience', index);
      }
    },
    handleNewLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newExperience.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetNewExperience() {
      this.newExperience = {
        title: '',
        company: '',
        type: '',
        period: '',
        location: '',
        description: '',
        logo: ''
      };
    },
    cancelAdd() {
      this.resetNewExperience();
      this.showAddForm = false;
    }
  }
}
</script>

<style scoped>
.add-experience-form {
  border: 2px dashed #dee2e6;
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: #f8f9fa;
}

.logo-placeholder-empty {
  width: 50px;
  height: 50px;
  background-color: #e9ecef;
  border: 2px dashed #ced4da;
}

.company-logo {
  min-width: 80px;
}
</style>
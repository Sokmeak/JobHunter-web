<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Education</h5>
        <div>
          <button 
            class="btn btn-link text-primary p-0 me-2"
            @click="showAddForm = !showAddForm"
          >
            <i :class="showAddForm ? 'bi bi-x-lg' : 'bi bi-plus'"></i>
          </button>
        </div>
      </div>

      <!-- Add New Education Form -->
      <div v-if="showAddForm" class="add-education-form mb-4">
        <div class="card">
          <div class="card-body">
            <h6 class="card-title">Add New Education</h6>
            
            <div class="d-flex mb-3">
              <div class="university-logo me-3">
                <div class="logo-placeholder position-relative">
                  <img 
                    v-if="newEducation.logo"
                    :src="newEducation.logo" 
                    alt="University Logo" 
                    class="rounded" 
                    width="50" 
                    height="50"
                  >
                  <div 
                    v-else
                    class="logo-placeholder-empty rounded d-flex align-items-center justify-content-center"
                  >
                    <i class="bi bi-mortarboard text-muted"></i>
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
                      v-model="newEducation.university"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="University/Institution"
                      required
                    >
                  </div>
                  <div class="col-md-6">
                    <input 
                      v-model="newEducation.degree"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="Degree & Field of Study"
                      required
                    >
                  </div>
                </div>
                
                <div class="row mb-2">
                  <div class="col-md-6">
                    <input 
                      v-model="newEducation.years"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="e.g., 2018 - 2022"
                      required
                    >
                  </div>
                  <div class="col-md-6">
                    <input 
                      v-model="newEducation.grade"
                      type="text" 
                      class="form-control form-control-sm"
                      placeholder="Grade/GPA (optional)"
                    >
                  </div>
                </div>
                
                <textarea 
                  v-model="newEducation.description"
                  class="form-control form-control-sm mb-3"
                  rows="3"
                  placeholder="Activities, societies, achievements, relevant coursework..."
                ></textarea>
                
                <div class="d-flex gap-2">
                  <button 
                    @click="addEducation"
                    class="btn btn-primary btn-sm"
                    :disabled="!isNewEducationValid"
                  >
                    <i class="bi bi-plus"></i> Add Education
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

      <!-- Education Items -->
      <education-item 
        v-for="(edu, index) in visibleEducations" 
        :key="edu.id || index" 
        :education="edu"
        :index="index"
        @edit="handleEditEducation"
        @delete="handleDeleteEducation"
      />

      <!-- Show More Button -->
      <button 
        v-if="moreCount > 0" 
        class="btn btn-link text-primary"
        @click="showMore"
      >
        Show {{ moreCount }} more education{{ moreCount > 1 ? 's' : '' }}
      </button>
    </div>
  </div>
</template>

<script>
import EducationItem from './EducationItem.vue'

export default {
  name: 'EducationSection',
  components: {
    EducationItem
  },
  props: {
    education: {
      type: Array,
      required: true
    },
    initialLimit: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      showAddForm: false,
      showLimit: this.initialLimit,
      newEducation: {
        university: '',
        degree: '',
        years: '',
        grade: '',
        description: '',
        logo: ''
      }
    }
  },
  computed: {
    visibleEducations() {
      return this.education.slice(0, this.showLimit)
    },
    moreCount() {
      return Math.max(0, this.education.length - this.showLimit)
    },
    isNewEducationValid() {
      return this.newEducation.university && 
             this.newEducation.degree && 
             this.newEducation.years;
    }
  },
  methods: {
    addEducation() {
      if (this.isNewEducationValid) {
        const educationToAdd = { ...this.newEducation };
        
        // If no logo uploaded, try to use a university logo service
        if (!educationToAdd.logo) {
          const universityName = educationToAdd.university.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
          educationToAdd.logo = `https://logo.clearbit.com/${universityName}.edu`;
        }
        
        // Add unique ID
        educationToAdd.id = Date.now();
        
        this.$emit('add-education', educationToAdd);
        this.resetNewEducation();
        this.showAddForm = false;
      }
    },
    handleEditEducation(index, updatedEducation) {
      // Handle the edit event from child component
      this.$emit('update-education', index, updatedEducation);
    },
    handleDeleteEducation(index) {
      if (confirm('Are you sure you want to delete this education entry?')) {
        this.$emit('delete-education', index);
      }
    },
    handleNewLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newEducation.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    resetNewEducation() {
      this.newEducation = {
        university: '',
        degree: '',
        years: '',
        grade: '',
        description: '',
        logo: ''
      };
    },
    cancelAdd() {
      this.resetNewEducation();
      this.showAddForm = false;
    },
    showMore() {
      this.showLimit = this.education.length;
    }
  },
  emits: ['add-education', 'update-education', 'delete-education']
}
</script>

<style scoped>
.add-education-form {
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

.university-logo {
  min-width: 80px;
}

.btn-link:hover {
  text-decoration: none;
}
</style>
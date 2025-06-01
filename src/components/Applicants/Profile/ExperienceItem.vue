<template>
  <div class="experience-item mb-4">
    <div class="d-flex">
      <div class="company-logo me-3">
        <div class="position-relative">
          <img 
            :src="localExperience.logo" 
            :alt="localExperience.company" 
            class="rounded" 
            width="50" 
            height="50"
          >
          <div v-if="isEditing" class="logo-overlay">
            <input 
              ref="logoInput"
              type="file" 
              accept="image/*" 
              @change="handleLogoUpload"
              class="d-none"
            >
            <button 
              @click="$refs.logoInput.click()"
              class="btn btn-sm btn-primary"
            >
              <i class="bi bi-camera"></i>
            </button>
          </div>
        </div>
      </div>

      
      
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <h6 v-if="!isEditing" class="mb-1">{{ localExperience.title }}</h6>
          <input 
            v-else
            v-model="localExperience.title"
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="Job Title"
          >
          
          <div class="d-flex gap-2">
            <button 
              class="btn btn-link text-primary p-0"
              @click="toggleEdit"
            >
              <i :class="isEditing ? 'bi bi-check-lg' : 'bi bi-pencil'"></i>
            </button>
            <button 
              v-if="!isEditing"
              class="btn btn-link text-danger p-0"
              @click="$emit('delete')"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
        
        <div v-if="!isEditing">
          <p class="text-muted mb-1">
            {{ localExperience.company }} · {{ localExperience.type }} · {{ localExperience.period }}
          </p>
          <p class="text-muted mb-1">{{ localExperience.location }}</p>
          <p class="mb-0">{{ localExperience.description }}</p>
        </div>
        
        <div v-else class="edit-form">
          <div class="row mb-2">
            <div class="col-md-6">
              <input 
                v-model="localExperience.company"
                type="text" 
                class="form-control form-control-sm"
                placeholder="Company"
              >
            </div>
            <div class="col-md-6">
              <select 
                v-model="localExperience.type"
                class="form-select form-select-sm"
              >
                <option value="">Employment Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>
          
          <div class="row mb-2">
            <div class="col-md-6">
              <input 
                v-model="localExperience.period"
                type="text" 
                class="form-control form-control-sm"
                placeholder="e.g., Jun 2019 - Present (1y 1m)"
              >
            </div>
            <div class="col-md-6">
              <input 
                v-model="localExperience.location"
                type="text" 
                class="form-control form-control-sm"
                placeholder="Location"
              >
            </div>
          </div>
          
          <textarea 
            v-model="localExperience.description"
            class="form-control form-control-sm"
            rows="3"
            placeholder="Job description..."
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceItem',
  props: {
    experience: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      localExperience: {}
    }
  },
  mounted() {
    this.localExperience = { ...this.experience };
  },
  watch: {
    experience: {
      handler(newVal) {
        if (!this.isEditing) {
          this.localExperience = { ...newVal };
        }
      },
      deep: true
    }
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        // Save changes
        this.$emit('update', this.localExperience);
      }
      this.isEditing = !this.isEditing;
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localExperience.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
</script>

<style scoped>
.logo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.company-logo:hover .logo-overlay {
  opacity: 1;
}

.edit-form {
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: #f8f9fa;
}
</style>
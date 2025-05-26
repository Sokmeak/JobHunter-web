<template>
  <div class="education-item mb-4 ">
    <div class="d-flex">
      <div class="university-logo me-3">
        <div class="position-relative">
        <img 
          :src="education.logo || defaultLogo" 
          :alt="education.university" 
          class="rounded"
          width="50" 
          height="50"
          @error="handleImageError"
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
          <h6 v-if="!isEditing" class="mb-1">{{ localEducation.degree }}</h6>
          <input 
            v-else
            v-model="localEducation.degree"
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="Degree & Field of Study"
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
              @click="$emit('delete', index)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>

        <div v-if="!isEditing">
          <p class="text-muted mb-1"> {{ localEducation.university }}}
          </p>
          <p class="text-muted mb-1">  {{ localEducation.years }}
          </p>
          <p class="text-muted mb-1" v-if="localEducation.grade">Grade: {{ localEducation.grade }}</p>
          <p class="mb-0">{{ localEducation.description }}</p>
        </div>
        
        <div v-else class="edit-form">
          <input 
            v-model="localEducation.university"
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="University/Institution"
          >
          <input 
            v-model="localEducation.years"
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="Years (e.g., 2018 - 2022)"
          >
          <input 
            v-model="localEducation.grade"
            type="text" 
            class="form-control form-control-sm mb-2"
            placeholder="Grade/GPA (optional)"
          >
          <textarea 
            v-model="localEducation.description"
            class="form-control form-control-sm mb-2"
            rows="3"
            placeholder="Activities, societies, achievements, relevant coursework..."
          ></textarea>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'EducationItem',
  props: {
    education: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      localEducation: { ...this.education },
      defaultLogo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjVGNUY1IiByeD0iOCIvPgo8cGF0aCBkPSJNMjUgMTBMMzAgMTVIMzVMMjggMjJIMzJMMjUgMzBMMTggMjJIMjJMMTUgMTVIMjBMMjUgMTBaIiBmaWxsPSIjNjM2NkYxIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMzciIHI9IjIiIGZpbGw9IiM2MzY2RjEiLz4KPC9zdmc+Cg=='
    }
  },
  watch: {
    education: {
      handler(newEducation) {
        if (!this.isEditing) {
          this.localEducation = { ...newEducation };
        }
      },
      deep: true
    }
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        // Save changes
        this.$emit('edit', this.index, this.localEducation);
      }
      this.isEditing = !this.isEditing;
      
      if (!this.isEditing) {
        // Reset to original if cancelled
        this.localEducation = { ...this.education };
      }
    },
    handleImageError(event) {
      event.target.src = this.defaultLogo;
    },
    handleLogoUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.localEducation.logo = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  },
  emits: ['edit', 'delete']
}
</script>

<style scoped>
.education-item:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
}

.btn-link:hover {
  text-decoration: none;
}

.university-logo img {
  object-fit: cover;
}

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
</style>
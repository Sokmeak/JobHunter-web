<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">About Me</h5>
        <button class="btn btn-link text-primary p-0" @click="toggleEdit">
          <i class="bi" :class="isEditing ? 'bi-check-lg' : 'bi-pencil'"></i>
        </button>
      </div>
      
      <!-- Read Mode -->
      <p v-if="!isEditing" class="mb-0">{{ currentAbout || 'Tell people about yourself...' }}</p>
      
      <!-- Edit Mode -->
      <div v-else>
        <textarea 
          v-model="editableAbout"
          class="form-control"
          rows="4"
          placeholder="Tell people about yourself..."
          @keydown.ctrl.enter="saveChanges"
          @keydown.meta.enter="saveChanges">
        </textarea>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <small class="text-muted">{{ editableAbout.length }}/500 characters</small>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" @click="cancelEdit">
              Cancel
            </button>
            <button class="btn btn-sm btn-primary" @click="saveChanges">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  props: {
    about: {
      type: String,
      default: ''
    }
  },
  emits: ['update:about'],
  data() {
    return {
      isEditing: false,
      currentAbout: this.about,
      editableAbout: this.about
    };
  },
  watch: {
    about(newValue) {
      this.currentAbout = newValue;
    }
  },
  methods: {
    toggleEdit() {
      if (this.isEditing) {
        this.saveChanges();
      } else {
        this.startEdit();
      }
    },
    
    startEdit() {
      this.isEditing = true;
      this.editableAbout = this.currentAbout;
      // Focus the textarea after Vue updates the DOM
      this.$nextTick(() => {
        const textarea = this.$el.querySelector('textarea');
        if (textarea) {
          textarea.focus();
          // Move cursor to end
          textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
      });
    },
    
    saveChanges() {
      // Limit character count
      if (this.editableAbout.length > 500) {
        this.editableAbout = this.editableAbout.substring(0, 500);
      }
      
      this.currentAbout = this.editableAbout.trim();
      this.isEditing = false;
      
      // Emit the change to parent component
      this.$emit('update:about', this.currentAbout);
    },
    
    cancelEdit() {
      this.editableAbout = this.currentAbout;
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
.form-control:focus {
  border-color: #000000;
}

.btn-link:hover {
  text-decoration: none;
}

/* Add Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css");
</style>
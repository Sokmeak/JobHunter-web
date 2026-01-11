<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Skills</h5>
        <div>
          <button 
            class="btn btn-link text-primary p-0 me-2"
            @click="toggleAddMode"
            :title="isAddingSkill ? 'Cancel' : 'Add skill'"
          >
            <i :class="isAddingSkill ? 'bi bi-x' : 'bi bi-plus'"></i>
          </button>
          <button 
            class="btn btn-link text-primary p-0"
            @click="toggleEditMode"
            :title="isEditing ? 'Done editing' : 'Edit skills'"
          >
            <i :class="isEditing ? 'bi bi-check' : 'bi bi-pencil'"></i>
          </button>
        </div>
      </div>

      <!-- Add Skill Form -->
      <div v-if="isAddingSkill" class="mb-3">
        <div class="input-group">
          <input
            v-model="newSkill"
            type="text"
            class="form-control"
            placeholder="Enter a new skill..."
            @keyup.enter="addSkill"
            @keyup.escape="cancelAdd"
            ref="skillInput"
            maxlength="50"
          >
          <button 
            class="btn btn-outline-primary" 
            type="button"
            @click="addSkill"
            :disabled="!newSkill.trim()"
          >
            Add
          </button>
        </div>
        <small class="text-muted">Press Enter to add, Escape to cancel</small>
      </div>

      <!-- Skills Display -->
      <div class="skills-container">
        <div v-if="skills.length === 0" class="text-muted text-center py-3">
          <i class="bi bi-lightbulb me-2"></i>
          No skills added yet. Click the + button to add your first skill.
        </div>
        
        <span 
          v-for="(skill, index) in skills" 
          :key="index" 
          class="skill-badge me-2 mb-2"
          :class="{ 'skill-badge-editing': isEditing }"
        >
          <span class="skill-text">{{ skill }}</span>
          <button 
            v-if="isEditing"
            class="skill-remove-btn"
            @click="removeSkill(index)"
            :title="`Remove ${skill}`"
          >
            <i class="bi bi-x"></i>
          </button>
        </span>
      </div>

      <!-- Skills Count -->
      <div v-if="skills.length > 0" class="mt-2">
        <small class="text-muted">
          {{ skills.length }} skill{{ skills.length !== 1 ? 's' : '' }} total
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkillsSection',
  props: {
    skills: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      isAddingSkill: false,
      newSkill: ''
    }
  },
  methods: {
    toggleEditMode() {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        this.isAddingSkill = false
      }
    },
    toggleAddMode() {
      this.isAddingSkill = !this.isAddingSkill
      if (this.isAddingSkill) {
        this.isEditing = false
        this.$nextTick(() => {
          this.$refs.skillInput?.focus()
        })
      } else {
        this.cancelAdd()
      }
    },
    addSkill() {
      const skill = this.newSkill.trim()
      if (skill && !this.skills.includes(skill)) {
        this.$emit('add-skill', skill)
        this.newSkill = ''
        this.$refs.skillInput?.focus()
      }
    },
    removeSkill(index) {
      if (confirm(`Remove "${this.skills[index]}" from your skills?`)) {
        this.$emit('remove-skill', index)
      }
    },
    cancelAdd() {
      this.newSkill = ''
      this.isAddingSkill = false
    }
  },
  emits: ['add-skill', 'remove-skill']
}
</script>

<style scoped>
.skill-badge {
  display: inline-flex;
  align-items: center;
  background-color: #f3f4f6;
  color: #4b5563;
  font-weight: normal;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.skill-badge:hover {
  background-color: #e5e7eb;
}

.skill-badge-editing {
  background-color: #fef3f2;
  border-color: #fecaca;
  padding-right: 4px;
}

.skill-badge-editing:hover {
  background-color: #fee2e2;
}

.skill-text {
  margin-right: 4px;
}

.skill-remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  padding: 2px 4px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 4px;
}

.skill-remove-btn:hover {
  background-color: #ef4444;
  color: white;
}

.input-group .form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.btn-outline-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.skills-container {
  min-height: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
</style>
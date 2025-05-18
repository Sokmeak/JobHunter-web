<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Skills</h5>
        <div>
          <button class="btn btn-link text-primary p-0 me-2">
            <i class="bi bi-plus"></i>
          </button>
          <button class="btn btn-link text-primary p-0">
            <i class="bi bi-pencil"></i>
          </button>
        </div>
      </div>
      <div class="skills-container">
        <span v-for="(skill, index) in skills" :key="index" class="badge bg-light text-dark me-2 mb-2 p-2">
          {{ skill }}
        </span>
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
  }
}
</script>

<style scoped>
.badge.bg-light {
  background-color: #f3f4f6 !important;
  color: #4b5563 !important;
  font-weight: normal;
  padding: 8px 12px;
  border-radius: 6px;
}
</style>
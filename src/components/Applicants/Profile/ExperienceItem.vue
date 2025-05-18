<template>
  <div class="experience-item mb-4">
    <div class="d-flex">
      <div class="company-logo me-3">
        <img :src="experience.logo" :alt="experience.company" class="rounded" width="50" height="50">
      </div>
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <h6 class="mb-1">{{ experience.title }}</h6>
          <button class="btn btn-link text-primary p-0">
            <i class="bi bi-pencil"></i>
          </button>
        </div>
        <p class="text-muted mb-1">
          {{ experience.company }} · {{ experience.type }} · {{ experience.period }}
        </p>
        <p class="text-muted mb-1">{{ experience.location }}</p>
        <p class="mb-0">{{ experience.description }}</p>
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
  }
}
</script>
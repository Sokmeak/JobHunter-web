<template>
  <div class="education-item mb-4">
    <div class="d-flex">
      <div class="university-logo me-3">
        <img :src="education.logo" :alt="education.university" class="rounded" width="50" height="50">
      </div>
      <div class="flex-grow-1">
        <div class="d-flex justify-content-between">
          <h6 class="mb-1">{{ education.university }}</h6>
          <button class="btn btn-link text-primary p-0">
            <i class="bi bi-pencil"></i>
          </button>
        </div>
        <p class="text-muted mb-1">{{ education.degree }}</p>
        <p class="text-muted mb-1">{{ education.years }}</p>
        <p class="mb-0">{{ education.description }}</p>
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
    }
  }
}
</script>
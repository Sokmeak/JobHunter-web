<template>
  <div class="d-flex">
    <div
      class="benefit-icon rounded-circle p-3 text-primary me-3 d-flex align-items-center justify-content-center"
    >
      <i :class="`bi ${icon}`"></i>
    </div>
    <div>
      <h3 class="fs-6 fw-bold mb-1">{{ title }}</h3>
      <p class="text-muted small mb-0">{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true, // Expects a Bootstrap icon class or Font Awesome class, e.g., "bi bi-heart"
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Optional custom styles here */
</style>

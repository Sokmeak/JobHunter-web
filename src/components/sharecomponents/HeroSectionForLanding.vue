<template>
  <div class="bg-light py-5">
    <div class="container">
      <div class="text-center mb-4">
        <h1 class="display-5 fw-bold mb-2">
          Find your
          <span class="text-primary position-relative">
            {{ title }}
          </span>
        </h1>
        <img
          src="../../assets/images/highlight.svg"
          width="300px"
          alt="highlight"
          class="highlight-img"
        />
        <p class="text-secondary mt-2">
          {{ subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props
defineProps({
  title: String,
  subtitle: String,
  popularTags: Array,
});
</script>

<style scoped>
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid #dee2e6;
  }
}

.bg-light {
  background-color: #f8f9fa !important;
}

.text-primary {
  color: #5b9af5 !important;
}

.card {
  border-radius: 12px;
  border: none;
}

.form-control:focus {
  box-shadow: none;
}

.form-control {
  font-size: 0.95rem;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 1.5rem !important;
}
</style>

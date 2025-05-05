<template>
  <div class="col-6 col-md-3 category-card">
    <div class="card h-100 border-0 shadow-sm">
      <div class="card-body p-4">
        <div class="category-icon mb-3">
          <i :class="category.icon" class="fs-4"></i>
        </div>
        <h5 class="card-title">{{ category.name }}</h5>
        <p class="card-text small mb-3">
          {{ category.jobCount }} open positions
        </p>
        <a
          href="#"
          class="stretched-link text-decoration-none mylink primary-color"
        >
          Explore jobs <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.primary-color {
  color: var(--primary-color);
}
.mylink:hover,
.card:hover {
  transform: translateY(-6px) scale(1.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: #4640de;
  color: #ffffff;
  box-shadow: 0 10px 20px rgba(70, 64, 222, 0.2);
  border-radius: 12px;
}
</style>

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
        <a href="#" class="stretched-link text-decoration-none mylink">
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

<style scoped>
.mylink:hover,
.card:hover {
  transform: translateY(-5px);
  transition: transform 0.3s ease;
  scale: 1.0005;
  color: white;
  background-color: #4640de;
}
</style>

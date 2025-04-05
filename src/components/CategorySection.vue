<template>
  <section class="category-section py-5">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">
          Explore by <span class="text-secondary">category</span>
        </h2>
        <a href="#" class="text-decoration-none text-primary">
          Show all jobs <i class="bi bi-arrow-right"></i
        ></a>
      </div>

      <div class="row g-4 category-list">
        <Category
          v-for="(category, index) in categories"
          :key="index"
          :category="category"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Category from "./Category.vue";
export default {
  components: {
    Category,
  },

  name: "CategorySection",
  data() {
    return {
      categories: [
        {
          name: "Design",
          icon: "bi bi-palette",
          jobCount: "235 jobs available",
        },
        {
          name: "Sales",
          icon: "bi bi-graph-up",
          jobCount: "340 jobs available",
        },
        {
          name: "Marketing",
          icon: "bi bi-megaphone",
          jobCount: "120 jobs available",
        },
        {
          name: "Finance",
          icon: "bi bi-cash-coin",
          jobCount: "80 jobs available",
        },
        {
          name: "Technology",
          icon: "bi bi-pc-display",
          jobCount: "320 jobs available",
        },
        {
          name: "Engineering",
          icon: "bi bi-code-slash",
          jobCount: "170 jobs available",
        },
        {
          name: "Business",
          icon: "bi bi-briefcase",
          jobCount: "210 jobs available",
        },
        {
          name: "Human Resources",
          icon: "bi bi-people",
          jobCount: "75 jobs available",
        },
      ],
    };
  },
};
</script>

<style scoped>
.category-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.categorylist {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.categorylist:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>

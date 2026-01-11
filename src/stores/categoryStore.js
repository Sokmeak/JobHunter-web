import { defineStore } from "pinia";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const loading = ref(false);

  // Simulated fetch from "mock API"
  const fetchCategories = () => {
    loading.value = true;
    return new Promise((resolve) => {
      setTimeout(() => {
        categories.value = [
          {
            id: 1,
            name: "Design",
            icon: "bi bi-palette",
            jobCount: "235 jobs available",
          },
          {
            id: 2,
            name: "Sales",
            icon: "bi bi-graph-up",
            jobCount: "340 jobs available",
          },
          {
            id: 3,
            name: "Marketing",
            icon: "bi bi-megaphone",
            jobCount: "120 jobs available",
          },
          {
            id: 4,
            name: "Finance",
            icon: "bi bi-cash-coin",
            jobCount: "80 jobs available",
          },
          {
            id: 5,
            name: "Technology",
            icon: "bi bi-pc-display",
            jobCount: "320 jobs available",
          },
          {
            id: 6,
            name: "Engineering",
            icon: "bi bi-code-slash",
            jobCount: "170 jobs available",
          },
          {
            id: 7,
            name: "Business",
            icon: "bi bi-briefcase",
            jobCount: "210 jobs available",
          },
          {
            id: 8,
            name: "Human Resources",
            icon: "bi bi-people",
            jobCount: "75 jobs available",
          },
        ];
        loading.value = false;
        resolve(categories.value);
      }, 100); // simulate network delay
    });
  };

  return { categories, fetchCategories, loading };
});

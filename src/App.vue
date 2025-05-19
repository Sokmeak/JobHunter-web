<template>
  <div>
    <Transition name="loader-fade" mode="out-in">
      <Loader v-if="showLoader" :loading-duration="loaderDuration" />
      <RouterView v-else />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Loader from "@/components/Loader.vue";
import { useRouter } from "vue-router";
import { useJobStore } from "@/stores/jobStore";
import { useCompanyStore } from "@/stores/companyStore";

// State
const showLoader = ref(true);
const loaderDuration = ref(2000); // Default duration
const router = useRouter();
const jobStore = useJobStore();
const companyStore = useCompanyStore();

// Preload store data
const preloadStores = () => {
  jobStore
    .fetchJobs()
    .catch((error) => console.error("Failed to fetch jobs:", error));
  companyStore
    .fetchCompanies()
    .catch((error) => console.error("Failed to fetch companies:", error));
};

// Initialize app
const initApp = async () => {
  const start = Date.now();
  try {
    await Promise.all([jobStore.fetchJobs(), companyStore.fetchCompanies()]);
    if (!document.getElementById("toast-container")) {
      const toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.style.zIndex = "9500";
      document.body.appendChild(toastContainer);
    }
  } catch (error) {
    console.error("App initialization failed:", error);
  } finally {
    const elapsed = Date.now() - start;
    loaderDuration.value = Math.max(800 - elapsed, 400); // Min 400ms, max 800ms
    setTimeout(() => {
      showLoader.value = false;
    }, loaderDuration.value);
  }
};

// Start preloading
preloadStores();
initApp();

// Handle route changes
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    showLoader.value = true;
    loaderDuration.value = 600; // Fast for routes
    setTimeout(() => {
      showLoader.value = false;
    }, loaderDuration.value);
  }
  next();
});
</script>

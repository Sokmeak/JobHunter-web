<template>
  <Transition name="loader-fade" mode="out-in">
    <Loader v-if="showLoader" :loading-duration="loaderDuration" />
  </Transition>
  <RouterView />
</template>

<script setup>
import { ref } from "vue";
import Loader from "@/components/Loader.vue";

// State
const showLoader = ref(true);

// const appStore = useAppStore(); // Use the app store for global state management

const loaderDuration = ref(2000); // Default duration

// Initialize app
const initApp = async () => {
  const start = Date.now();
  try {
    // await Promise.all([jobStore.fetchJobs(), companyStore.fetchCompanies()]);
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
    loaderDuration.value = Math.max(1000 - elapsed, 500); // Min 500ms, max 1000ms
    setTimeout(() => {
      showLoader.value = false;
    }, loaderDuration.value);
  }
};

// Start preloading

initApp();

// // Handle route changes
// router.beforeEach((to, from, next) => {
//   if (to.path !== from.path) {
//     showLoader.value = true;
//     loaderDuration.value = 600; // Fast for routes
//     setTimeout(() => {
//       showLoader.value = false;
//     }, loaderDuration.value);
//   }
//   next();
// });
</script>

<template>
  <RouterView />
</template>

<script setup>
// Initialization logic (optional)
const initApp = async () => {
  try {
    if (!document.getElementById("toast-container")) {
      const toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.style.zIndex = "9500";
      document.body.appendChild(toastContainer);
    }
  } catch (error) {
    console.error("App initialization failed:", error);
  }
};

initApp();
</script>

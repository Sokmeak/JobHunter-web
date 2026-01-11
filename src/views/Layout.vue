<template>
  <div class="layout">
    <NavBar />

    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.fullPath" />
      </Transition>
    </router-view>
    <Footer />
  </div>
</template>

<script setup>
import NavBar from "@/components/sharecomponents/NavBar.vue";
import Footer from "@/components/sharecomponents/Footer.vue";
</script>

<style scoped>
.layout {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

/* Ensure NavBar and Footer are above loader */
:deep(.navbar) {
  z-index: 10000;
}

:deep(.footer) {
  z-index: 10000;
}

/* Loader transition */
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.2s ease;
}
.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}

/* Content transition (faster) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease; /* Reduced from 0.3s */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

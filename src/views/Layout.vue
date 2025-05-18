<template>
  <div class="layout">
    <!-- <Transition name="loader-fade" mode="out-in">
      <GlobalLoading v-if="showLoader" />
    </Transition> -->

    <NavBar />
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </router-view>
    <Footer />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import NavBar from "@/components/sharecomponents/NavBar.vue";
import Footer from "@/components/sharecomponents/Footer.vue";
import Loader from "@/components/Loader.vue";
import { ref, onMounted } from "vue";

export default {
  components: {
    NavBar,
    Footer,
    GlobalLoading: Loader,
  },
  setup() {
    const showLoader = ref(true);

    onMounted(() => {
      // Simulate loading completion
      setTimeout(() => {
        showLoader.value = false;
      }, 1500); // Adjust timing to match your actual loading duration
    });

    return {
      showLoader,
    };
  },
};
</script>

<style>
.layout {
  padding: 0;
  margin: 0;
  min-height: 100vh; /* Changed from height to min-height */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative; /* Added for proper loader positioning */
}

/* Loader transition */
.loader-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

/* Content transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Ensure loader covers full viewport without leaving space */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 9999;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="applicant-layout d-flex">
    <!-- Sidebar -->
    <SidebarNavigation />

    <!-- Main Content -->
    <div class="main-content flex-grow-1">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarNavigation from "@/components/Applicants/layout/SidebarNavigation.vue";

export default {
  name: "ApplicantLayout",
  components: {
    SidebarNavigation,
  },
};
</script>

<style scoped>
.applicant-layout {
  min-height: 100vh;
}

.main-content {
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
  height: 100vh;
}
</style>

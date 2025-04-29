<template>
  <div class="sidebar bg-white border-end" style="width: 250px; height: 100vh">
    <div class="d-flex align-items-center p-3 mb-3">
      <PrimaryLogo />
    </div>
    <nav class="px-3">
      <div class="nav flex-column">
        <a
          href="#"
          class="nav-link active bg-light rounded mb-2 d-flex align-items-center"
        >
          <i class="bi bi-house me-2"></i>
          <span>Dashboard</span>
        </a>
        <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
          <i class="bi bi-file-text me-2"></i>
          <span>My Applications</span>
        </a>
        <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
          <i class="bi bi-search me-2"></i>
          <span>Find Jobs</span>
        </a>
        <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
          <i class="bi bi-building me-2"></i>
          <span>Browse Companies</span>
        </a>
        <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
          <i class="bi bi-person me-2"></i>
          <span>My Public Profile</span>
        </a>
      </div>

      <div class="mt-4">
        <h6 class="text-uppercase text-muted small fw-bold px-3 mb-3">Settings</h6>
        <div class="nav flex-column">
          <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
            <i class="bi bi-gear me-2"></i>
            <span>Settings</span>
          </a>
          <a href="#" class="nav-link text-secondary mb-2 d-flex align-items-center">
            <i class="bi bi-question-circle me-2"></i>
            <span>Help Center</span>
          </a>
        </div>
      </div>
    </nav>

    <div class="position-absolute bottom-0 start-0 w-100 p-3 border-top">
      <div class="d-flex align-items-center">
        <div
          class="bg-light rounded-circle d-flex align-items-center justify-content-center me-2"
          style="width: 40px; height: 40px"
        >
          <i class="bi bi-person"></i>
        </div>
        <div>
          <p class="mb-0 fw-medium">{{ user.fullName }}</p>
          <p class="mb-0 small text-muted">{{ user.email }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PrimaryLogo from "@/components/PrimaryLogo.vue";
export default {
  name: "SidebarNavigation",
  components: {
    PrimaryLogo,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.nav-link.active {
  color: #6610f2 !important;
  font-weight: 500;
}

.nav-link:hover:not(.active) {
  background-color: #f8f9fa;
  color: #212529 !important;
}
</style>

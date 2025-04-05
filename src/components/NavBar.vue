<template>
  <header
    class="sticky-top bg-white shadow-sm animate__animated animate__fadeInDown"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div class="container">
        <PrimaryLogo />

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                to="find-jobs"
                :class="{ active: route.path.includes('find-jobs') }"
                >Find Jobs</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink
                class="nav-link"
                to="all-companies"
                :class="{ active: route.path.includes('all-companies') }"
                >Browse Companies</RouterLink
              >
            </li>
          </ul>

          <div class="d-flex">
            <a href="#" class="btn btn-link text-dark text-decoration-none me-2"
              >Login</a
            >
            <span class="divider"></span>

            <a href="#" class="btn btn-primary bg-primary-color px-4"
              >Sign Up</a
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import PrimaryLogo from "./PrimaryLogo.vue";
import { useRoute } from "vue-router";
export default {
  name: "NavbarComponent",
  components: {
    PrimaryLogo,
  },

  setup() {
    const route = useRoute();
    return { route };
  },
};
</script>

<style>
.divider {
  height: 2rem;
  border-left: 1px solid #939393;
  margin: 3px 15px;
}

.btn-primary:hover {
  background-color: #4f46e5;
  border-color: #4f46e5;
}

.nav-link.active {
  color: #4f46e5 !important;
  font-weight: 600;
  position: relative;
}

.nav-link.active::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4f46e5;
}
</style>

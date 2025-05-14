<template>
  <header
    class="sticky-top bg-white shadow-sm animate__animated animate__fadeInDown"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-white py-3">
      <div class="container">
        <PrimaryLogo />

        <!-- Hamburger menu button for mobile -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleMenu"
        >
          <!-- X icon when menu is open -->
          <svg
            v-if="isMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <!-- Hamburger icon when menu is closed -->
          <span v-else class="navbar-toggler-icon"></span>
        </button>

        <div
          class="collapse navbar-collapse"
          :class="{ show: isMenuOpen }"
          id="navbarNav"
        >
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

          <div
            class="d-flex flex-column flex-lg-row align-items-start align-items-lg-center mt-3 mt-lg-0"
          >
            <RouterLink
              to="/signin"
              class="btn btn-secodary text-decoration-none me-2 px-4 mt-2 mt-lg-0"
              >Login
            </RouterLink>
            <span class="divider d-none d-lg-block"></span>

            <RouterLink
              to="/signup"
              class="btn btn-primary bg-primary-color px-4 mt-2 mt-lg-0"
            >
              Sign Up</RouterLink
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
import { ref } from "vue";

export default {
  name: "NavbarComponent",
  components: {
    PrimaryLogo,
  },

  setup() {
    const route = useRoute();
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    return {
      route,
      isMenuOpen,
      toggleMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; // <-- important
.divider {
  height: 2rem;
  border-left: 1px solid #939393;
  margin: 3px 15px;
}
.bg-primary-color {
  background-color: var(--primary-color);
}
.btn-secodary:hover {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.nav-link.active {
  color: var(--primary-color);
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
  background-color: var(--primary-color);
}

/* Responsive styles */
@media (max-width: 991.98px) {
  .navbar-collapse {
    transition: all 0.3s ease;
  }

  .navbar-collapse.show {
    display: block;
  }

  .divider {
    display: none;
  }

  .d-flex {
    margin-top: 1rem;
  }
}
</style>

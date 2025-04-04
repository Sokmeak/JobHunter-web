<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-white py-3 sticky-top bg-white shadow-sm animate__animated animate__fadeInDown"
  >
    <div class="container">
      <PrimaryLogo />
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link" href="#">Find Jobs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Browse Companies</a>
          </li>
        </ul>

        <div class="d-flex">
          <a href="#" class="btn btn-link text-dark text-decoration-none me-2"
            >Login</a
          >
          <a href="#" class="btn btn-primary px-4">Sign Up</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import PrimaryLogo from "./PrimaryLogo.vue";
export default {
  name: "NavbarComponent",
  components: {
    PrimaryLogo,
  },
};
</script>

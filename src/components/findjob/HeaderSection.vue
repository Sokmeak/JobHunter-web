<template>
  <div class="bg-light py-5">
    <div class="container">
      <div class="text-center mb-4">
        <h1 class="display-5 fw-bold mb-2">
          Find your
          <span class="text-primary position-relative">
            dream job
            <!-- <span
              class="position-absolute bottom-0 start-0 w-100"
              style="height: 2px; background-color: #0d6efd"
            ></span> -->
          </span>
        </h1>
        <img
          src="../../assets/images/highlight.svg"
          width="300px"
          alt="highlight"
          class="highlight-img"
        />
        <p class="text-secondary mt-2">
          Find your next career at companies like HubSpot, Nike, and Dropbox
        </p>
      </div>

  

      <!-- use component instead -->
      <SearchJob />
      <div class="text-center text-secondary small">
        Popular: UI Designer, UX Researcher, Android, Admin
      </div>
    </div>
  </div>
</template>

<script>
// No additional script needed
import SearchJob from "../sharecomponents/SeachJob.vue";

export default {
  name: "HeroSection",
  components: {
    SearchJob,
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .border-end-md {
    border-right: 1px solid #dee2e6;
  }
}

/* Bootstrap customizations */
.bg-light {
  background-color: #f8f9fa !important;
}

.text-primary {
  color: #5b9af5 !important;
}

.position-absolute.bottom-0.start-0.w-100 {
  bottom: -4px !important;
  height: 3px !important;
  background-color: #5b9af5 !important;
}

.card {
  border-radius: 12px;
  border: none;
}

.form-control:focus {
  box-shadow: none;
}

.form-control {
  font-size: 0.95rem;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 1.5rem !important;
}
</style>

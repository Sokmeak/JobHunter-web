<template>
  <section class="job-posting-cta">
    <div class="container p-5 bg-primary-color text-white">
      <div class="row align-items-center">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <h1 class="display-5 mb-3 fw-bold">Start posting<br />jobs today</h1>
          <p class="mb-4">Start posting jobs for only $10 per post.</p>
          <RouterLink to="/signup" class="btn btn-light px-4 py-2 fw-medium"
            >Sign Up For Free</RouterLink
          >
        </div>
        <div class="col-lg-6">
          <img
            src="../../assets/images/CTA.png"
            alt="Dashboard"
            class="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "JobPostingCTA",
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.bg-primary-color {
  background-color: var(--primary-color);
}
</style>

<template>
  <section class="hero-section py-5">
    <div class="container">
      <div class="col py-4">
        <div class="col-lg-6">
          <h1 class="display-5 fw-bold mb-3">
            Discover<br />more than<br /><span class="text-primary"
              >5000+ Jobs</span
            >
          </h1>
          <p class="text-muted mb-4">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>
        </div>

        <div class="search-form p-3 bg-white rounded shadow-sm w-60">
          <div class="flex row  g-1">
            <div class="col-md-4">
              <div class="input-group">
                <span class="input-group-text bg-white border-0">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-0"
                  placeholder="Job title or keyword"
                />
              </div>
            </div>
            <div class="col-md-4">
              <div class="input-group">
                <span class="input-group-text bg-white border-0">
                  <i class="bi bi-geo-alt"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-0"
                  placeholder="Location, City"
                />
              </div>
            </div>
            <div class="col-md-4">
              <button class="btn btn-lg btn-primary">Search my job</button>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <span class="text-muted small">Popular:</span>
          <span class="badge rounded-pill bg-light text-dark me-2 small"
            >UI Designer</span
          >
          <span class="badge rounded-pill bg-light text-dark me-2 small"
            >UX Developer</span
          >
          <span class="badge rounded-pill bg-light text-dark me-2 small"
            >Android</span
          >
          <span class="badge rounded-pill bg-light text-dark me-2 small"
            >Admin</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
};
</script>

<style scoped>
.hero-section {
  background-color: #f8f9fa;
}

.search-form {
  width: 60%;
  border-radius: 8px;
}
</style>

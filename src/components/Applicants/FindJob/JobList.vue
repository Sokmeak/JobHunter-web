<template>
  <div class="job-list">
    <div class="job-card" v-for="job in jobs" :key="job.id">
      <div class="row align-items-center">
        <div class="col-md-8">
          <div class="d-flex">
            <div class="company-logo me-3">
              <img
                :src="job.company.logo"
                alt="Company logo"
                class="img-fluid"
              />
            </div>
            <div class="job-info">
              <h3 class="h5 mb-1">{{ job.title }}</h3>
              <div class="company-location mb-2">
                <span class="company-name">{{ job.company.name }}</span>
                <span class="location-dot mx-2">•</span>
                <span class="location">{{ job.location }}</span>
              </div>
              <div class="job-tags">
                <span
                  class="job-tag"
                  v-for="(tag, index) in job.tags"
                  :key="index"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-md-end mt-3 mt-md-0">
          <button class="btn btn-primary mb-2 w-100">Apply</button>
          <div class="application-count">
            <small
              >{{ job.applied }} applied of {{ job.capacity }} capacity</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  jobs: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.job-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  transition: all 0.2s;
}

.job-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.company-logo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.company-name {
  font-weight: 500;
}

.location {
  color: #6c757d;
}

.job-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 4px;
}

.job-tag:nth-child(1) {
  background-color: #e3f2fd;
  color: #2196f3;
}

.job-tag:nth-child(2) {
  background-color: #fff8e1;
  color: #ff9800;
}

.job-tag:nth-child(3) {
  background-color: #e8f5e9;
  color: #4caf50;
}

.application-count {
  color: #6c757d;
  font-size: 12px;
}
</style>

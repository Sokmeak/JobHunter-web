<template>
  <div class="company-grid">
    <div class="row g-4">
      <div class="col-md-6" v-for="company in companies" :key="company.id">
        <div class="company-card">
          <div class="row">
            <div class="col-md-3">
              <div class="company-logo">
                <img
                  :src="company.logo"
                  :alt="company.name + ' logo'"
                  class="img-fluid"
                />
              </div>
            </div>
            <div class="col-md-9">
              <div class="company-info">
                <div class="d-flex justify-content-between align-items-start">
                  <h3 class="h5 mb-2">{{ company.name }}</h3>
                  <span class="job-count">{{ company.jobCount }} Jobs</span>
                </div>
                <p class="company-description mb-3">
                  {{ company.description }}
                </p>
                <div class="company-tags">
                  <span
                    class="company-tag"
                    v-for="(tag, index) in company.tags"
                    :key="index"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  companies: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.company-card {
  background-color: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  transition: all 0.2s;
}

.company-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.company-logo {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
}

.company-logo img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.company-description {
  font-size: 14px;
  color: #6c757d;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-count {
  color: #5138ee;
  font-weight: 500;
  font-size: 14px;
}

.company-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 12px;
  margin-right: 8px;
  margin-bottom: 4px;
}

.company-tag:nth-child(1) {
  background-color: #e3f2fd;
  color: #2196f3;
}

.company-tag:nth-child(2) {
  background-color: #fff8e1;
  color: #ff9800;
}
</style>

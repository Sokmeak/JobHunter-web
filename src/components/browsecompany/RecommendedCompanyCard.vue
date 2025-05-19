<template>
  <RouterLink to="/company/1" class="link company-card">
    <div class="company-header">
      <div
        class="company-logo"
        :style="{ backgroundColor: company.logoBg || '#f3f4f6' }"
      >
        <img :src="company.logo" :alt="company.name + ' logo'" />
      </div>
      <div class="job-count">{{ company.jobCount }} Jobs</div>
    </div>

    <h3 class="company-name">{{ company.name }}</h3>
    <p class="company-description">{{ company.description }}</p>

    <div class="company-tags">
      <span
        v-for="(tag, index) in company.tags"
        :key="index"
        class="tag"
        :class="{
          'tag-tech': tag === 'Technology',
          'tag-crypto': tag === 'Crypto',
          'tag-service': tag === 'Business Service',
        }"
      >
        {{ tag }}
      </span>
    </div>
  </RouterLink>
</template>

<script setup>
defineProps({
  company: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.logo && value.jobCount !== undefined;
    },
  },
});
</script>

<style scoped>
.link {
  text-decoration: none;
}
.company-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  transition: all 0.2s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.company-card:hover {
  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.company-logo {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.company-logo img {
  width: 60%;
  height: 60%;
  object-fit: contain;
}

.job-count {
  font-size: 0.875rem;
  color: #4f46e5;
  font-weight: 500;
}

.company-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.company-description {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.5;
  flex-grow: 1;
}

.company-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  background-color: #f8fafc;
  color: #64748b;
  border: 1px solid #e2e8f0;
}

.tag-tech {
  background-color: #f0f9ff;
  color: #0284c7;
  border-color: #bae6fd;
}

.tag-crypto {
  background-color: #f8fafc;
  color: #7c3aed;
  border-color: #e9d5ff;
}

.tag-service {
  background-color: #f0f9ff;
  color: #0369a1;
  border-color: #bae6fd;
}
</style>

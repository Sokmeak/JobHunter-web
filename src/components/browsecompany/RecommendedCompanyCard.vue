<template>
  <div class="company-card" :class="{ featured: company.featured }">
    <!-- Featured badge -->
    <div class="featured-badge" v-if="company.featured">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
      Featured
    </div>

    <!-- Header -->
    <div class="company-header">
      <div
        class="company-logo"
        :style="{ backgroundColor: company.logoBg || '#f3f4f6' }"
      >
        <img
          :src="company.logo"
          :alt="company.name + ' logo'"
          class="logo-image"
          @error="handleImageError"
        />
      </div>

      <div class="job-count">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h16z"
          />
        </svg>
        {{ countJobs(company) }} {{ countJobs(company) === 1 ? "Job" : "Jobs" }}
      </div>
    </div>

    <!-- Company info -->
    <div class="company-info">
      <h3 class="company-name">{{ company.name }}</h3>

      <div class="company-meta">
        <span v-if="company.location" class="meta-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10"
            />
            <path
              d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
            />
          </svg>
          {{ company.location }}
        </span>

        <span v-if="company.size" class="meta-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-people"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"
            />
          </svg>
          {{ company.size }}
        </span>
      </div>

      <p class="company-description">{{ company.description }}</p>
    </div>

    <!-- Tags -->
    <div class="company-tags">
      <span
        v-for="(tag, index) in displayTags"
        :key="index"
        class="tag"
        :class="getTagClass(tag)"
      >
        {{ tag }}
      </span>
      <span v-if="company.tags.length > maxTags" class="tag tag-more">
        +{{ company.tags.length - maxTags }}
      </span>
    </div>

    <!-- Footer -->
    <div class="company-footer">
      <RouterLink
        to="/company/1"
        class="btn btn-view-details"
        @click.prevent="viewDetails"
      >
        View Details
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  company: {
    type: Object,
    required: true,
  },
  maxTags: {
    type: Number,
    default: 2,
  },
});

const emit = defineEmits(["quick-apply", "view-company", "view-details"]);

const countJobs = (company) => company.jobIds?.length || 0;

const hasActiveJobs = computed(() => countJobs(props.company) > 0);

const displayTags = computed(
  () => props.company.tags?.slice(0, props.maxTags) || []
);

const getTagClass = (tag) => {
  const tagClasses = {
    Technology: "tag-tech",
    Tech: "tag-tech",
    Crypto: "tag-crypto",
    Blockchain: "tag-crypto",
    "Business Service": "tag-service",
    Business: "tag-service",
    Fintech: "tag-fintech",
    Productivity: "tag-productivity",
    Healthcare: "tag-healthcare",
    "E-commerce": "tag-ecommerce",
    AI: "tag-ai",
    "Machine Learning": "tag-ai",
    Sustainability: "tag-sustainability",
    Consulting: "tag-consulting",
  };
  return tagClasses[tag] || "tag-default";
};

const getDomainFromUrl = (url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
};

const viewDetails = () => {
  emit("view-details", props.company);
};

const handleImageError = (event) => {
  event.target.style.display = "none";
};
</script>

<style scoped>
.company-card {
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background: white;
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 320px;
}

.company-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.75rem 0.75rem 0 0;
}

.company-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  border-color: #cbd5e1;
}

.company-card:hover::before {
  opacity: 1;
}

.company-card.featured::before {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  opacity: 1;
}

.featured-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
}

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
}

.company-logo {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-image {
  width: 70%;
  height: 70%;
  object-fit: contain;
}

.job-count {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #4f46e5;
  font-weight: 600;
}

.company-info {
  flex-grow: 1;
  margin-bottom: 1rem;
}

.company-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
}

.company-meta {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  color: #64748b;
}

.company-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.company-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  transition: transform 0.2s ease;
}

.tag:hover {
  transform: translateY(-1px);
}

.tag-default {
  background: #f1f5f9;
  color: #64748b;
}
.tag-tech {
  background: #dbeafe;
  color: #1d4ed8;
}
.tag-crypto {
  background: #f3e8ff;
  color: #7c3aed;
}
.tag-service {
  background: #ecfdf5;
  color: #059669;
}
.tag-fintech {
  background: #fef3c7;
  color: #d97706;
}
.tag-productivity {
  background: #fce7f3;
  color: #be185d;
}
.tag-healthcare {
  background: #f0f9ff;
  color: #0369a1;
}
.tag-ecommerce {
  background: #fff7ed;
  color: #ea580c;
}
.tag-ai {
  background: #f8fafc;
  color: #475569;
}
.tag-sustainability {
  background: #f0fdf4;
  color: #16a34a;
}
.tag-consulting {
  background: #fefce8;
  color: #ca8a04;
}
.tag-more {
  background: #f8fafc;
  color: #64748b;
  border: 1px dashed #cbd5e1;
}

.company-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.btn-view-details {
  width: 100%;
  padding: 0.75rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-view-details:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .company-card {
    max-width: none;
    padding: 1rem;
  }

  .company-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>

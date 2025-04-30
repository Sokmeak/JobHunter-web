<template>
  <div class="company-filters">
    <div class="filter-section">
      <div
        class="filter-header"
        data-bs-toggle="collapse"
        data-bs-target="#industryFilter"
      >
        <h3 class="h6 mb-0">Industry</h3>
        <i class="bi bi-chevron-down"></i>
      </div>
      <div id="industryFilter" class="collapse show">
        <div
          class="form-check mb-2"
          v-for="(count, industry) in industries"
          :key="industry"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="industry.toLowerCase().replace(' ', '-')"
          />
          <label
            class="form-check-label"
            :for="industry.toLowerCase().replace(' ', '-')"
          >
            {{ industry }} ({{ count }})
          </label>
        </div>
      </div>
    </div>

    <div class="filter-section">
      <div
        class="filter-header"
        data-bs-toggle="collapse"
        data-bs-target="#companySizeFilter"
      >
        <h3 class="h6 mb-0">Company Size</h3>
        <i class="bi bi-chevron-down"></i>
      </div>
      <div id="companySizeFilter" class="collapse show">
        <div
          class="form-check mb-2"
          v-for="(count, size) in companySizes"
          :key="size"
        >
          <input
            class="form-check-input"
            type="checkbox"
            :id="size.toLowerCase().replace(' ', '-')"
          />
          <label
            class="form-check-label"
            :for="size.toLowerCase().replace(' ', '-')"
          >
            {{ size }} ({{ count }})
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const industries = ref({
  Advertising: 43,
  "Business Service": 4,
  Blockchain: 5,
  Cloud: 15,
  "Consumer Tech": 5,
  Education: 34,
  Fintech: 45,
  Gaming: 33,
  "Food & Beverage": 5,
  Healthcare: 3,
  Hostinng: 5,
  Media: 4,
});

const companySizes = ref({
  "1-50": 25,
  "51-150": 57,
  "151-250": 45,
  "251-500": 4,
  "501-1000": 43,
  "1000 - above": 23,
});
</script>

<style scoped>
.company-filters {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e9ecef;
}

.filter-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.form-check-label {
  color: #6c757d;
  font-size: 14px;
}
</style>

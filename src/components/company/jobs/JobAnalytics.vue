<template>
<div class="job-analytics">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="mb-1 fw-bold">Job Analytics</h2>
      <p class="text-muted mb-0">Detailed analytics for {{ job.title }}</p>
    </div>
    <div class="btn-group" role="group">
      <button 
        v-for="period in timePeriods"
        :key="period.key"
        type="button" 
        class="btn btn-sm"
        :class="activePeriod === period.key ? 'btn-primary' : 'btn-outline-secondary'"
        @click="setTimePeriod(period.key)"
      >
        {{ period.label }}
      </button>
    </div>
  </div>

  <!-- Analytics Cards -->
  <div class="row g-4 mb-4">
    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4 text-center">
          <div class="analytics-icon bg-primary-subtle text-primary rounded-circle mx-auto mb-3">
            <i class="bi bi-eye fs-4"></i>
          </div>
          <h3 class="mb-1 fw-bold">{{ analytics.totalViews }}</h3>
          <p class="text-muted mb-0">Total Views</p>
          <small class="text-success">
            <i class="bi bi-arrow-up"></i> +12% from last week
          </small>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4 text-center">
          <div class="analytics-icon bg-success-subtle text-success rounded-circle mx-auto mb-3">
            <i class="bi bi-person-plus fs-4"></i>
          </div>
          <h3 class="mb-1 fw-bold">{{ analytics.totalApplications }}</h3>
          <p class="text-muted mb-0">Applications</p>
          <small class="text-success">
            <i class="bi bi-arrow-up"></i> +8% from last week
          </small>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4 text-center">
          <div class="analytics-icon bg-warning-subtle text-warning rounded-circle mx-auto mb-3">
            <i class="bi bi-percent fs-4"></i>
          </div>
          <h3 class="mb-1 fw-bold">{{ analytics.conversionRate }}%</h3>
          <p class="text-muted mb-0">Conversion Rate</p>
          <small class="text-danger">
            <i class="bi bi-arrow-down"></i> -2% from last week
          </small>
        </div>
      </div>
    </div>

    <div class="col-lg-3 col-md-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4 text-center">
          <div class="analytics-icon bg-info-subtle text-info rounded-circle mx-auto mb-3">
            <i class="bi bi-clock fs-4"></i>
          </div>
          <h3 class="mb-1 fw-bold">{{ analytics.avgTimeToApply }}</h3>
          <p class="text-muted mb-0">Avg. Time to Apply</p>
          <small class="text-success">
            <i class="bi bi-arrow-down"></i> -15min from last week
          </small>
        </div>
      </div>
    </div>
  </div>

  <!-- Charts Row -->
  <div class="row g-4 mb-4">
    <!-- Views & Applications Chart -->
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Views & Applications Over Time</h5>
          <div class="chart-container" style="height: 300px;">
            <canvas ref="viewsChart"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Sources -->
    <div class="col-lg-4">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Application Sources</h5>
          <div class="sources-list">
            <div v-for="source in applicationSources" :key="source.name" class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center">
                <div class="source-color me-3" :style="{ backgroundColor: source.color }"></div>
                <span>{{ source.name }}</span>
              </div>
              <div class="text-end">
                <div class="fw-bold">{{ source.count }}</div>
                <small class="text-muted">{{ source.percentage }}%</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Detailed Analytics -->
  <div class="row g-4">
    <!-- Geographic Distribution -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Geographic Distribution</h5>
          <div class="geographic-list">
            <div v-for="location in geographicData" :key="location.city" class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div class="fw-medium">{{ location.city }}</div>
                <small class="text-muted">{{ location.country }}</small>
              </div>
              <div class="text-end">
                <div class="fw-bold">{{ location.applications }}</div>
                <div class="progress mt-1" style="height: 4px; width: 100px;">
                  <div class="progress-bar bg-primary" :style="{ width: location.percentage + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Experience Level -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h5 class="mb-4 fw-bold">Experience Level Distribution</h5>
          <div class="experience-chart" style="height: 200px;">
            <canvas ref="experienceChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const viewsChart = ref(null)
const experienceChart = ref(null)
const activePeriod = ref('week')

const timePeriods = ref([
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
  { key: 'quarter', label: 'Quarter' }
])

const job = ref({
  title: 'Senior Frontend Developer'
})

const analytics = ref({
  totalViews: 1250,
  totalApplications: 24,
  conversionRate: 1.9,
  avgTimeToApply: '2h 15m'
})

const applicationSources = ref([
  { name: 'Company Website', count: 12, percentage: 50, color: '#6366f1' },
  { name: 'LinkedIn', count: 8, percentage: 33, color: '#0077b5' },
  { name: 'Indeed', count: 3, percentage: 13, color: '#2557a7' },
  { name: 'Other', count: 1, percentage: 4, color: '#64748b' }
])

const geographicData = ref([
  { city: 'San Francisco', country: 'USA', applications: 8, percentage: 80 },
  { city: 'New York', country: 'USA', applications: 6, percentage: 60 },
  { city: 'Los Angeles', country: 'USA', applications: 4, percentage: 40 },
  { city: 'Seattle', country: 'USA', applications: 3, percentage: 30 },
  { city: 'Austin', country: 'USA', applications: 3, percentage: 30 }
])

const setTimePeriod = (period) => {
  activePeriod.value = period
  console.log('Time period changed to:', period)
}

const initCharts = () => {
  // Initialize charts here - in a real app, use Chart.js or similar
  console.log('Initializing charts...')
}

onMounted(() => {
  initCharts()
})
</script>

<style scoped>
.analytics-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.source-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.chart-container canvas {
  width: 100%;
  height: 100%;
}

.progress {
  background-color: #e9ecef;
}
</style>

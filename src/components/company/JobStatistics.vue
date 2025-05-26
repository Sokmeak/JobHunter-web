<template>
  <div class="job-statistics">
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h5 class="mb-1">Job statistics</h5>
            <p class="text-muted small mb-0">Showing Jobstatistic Jul 19-25</p>
          </div>
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-sm"
              :class="
                timePeriod === 'week' ? 'btn-primary' : 'btn-outline-secondary'
              "
              @click="timePeriod = 'week'"
            >
              Week
            </button>
            <button
              type="button"
              class="btn btn-sm"
              :class="
                timePeriod === 'month' ? 'btn-primary' : 'btn-outline-secondary'
              "
              @click="timePeriod = 'month'"
            >
              Month
            </button>
            <button
              type="button"
              class="btn btn-sm"
              :class="
                timePeriod === 'year' ? 'btn-primary' : 'btn-outline-secondary'
              "
              @click="timePeriod = 'year'"
            >
              Year
            </button>
          </div>
        </div>

        <!-- Tab Navigation -->
        <ul class="nav nav-tabs border-0 mb-4">
          <li class="nav-item">
            <button
              class="nav-link border-0 px-0 me-4"
              :class="{
                'active text-primary border-bottom border-primary border-2':
                  activeTab === 'overview',
              }"
              @click="activeTab = 'overview'"
            >
              Overview
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link border-0 px-0 me-4 text-muted"
              :class="{
                'active text-primary border-bottom border-primary border-2':
                  activeTab === 'jobs-view',
              }"
              @click="activeTab = 'jobs-view'"
            >
              Jobs View
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link border-0 px-0 text-muted"
              :class="{
                'active text-primary border-bottom border-primary border-2':
                  activeTab === 'jobs-applied',
              }"
              @click="activeTab = 'jobs-applied'"
            >
              Jobs Applied
            </button>
          </li>
        </ul>

        <!-- Animated Chart -->
        <div class="chart-container" style="height: 300px; position: relative">
          <div
            class="d-flex align-items-end justify-content-between h-100 px-3"
            style="padding-bottom: 40px"
          >
            <div
              v-for="(day, index) in chartData"
              :key="day.day"
              class="chart-bar-container d-flex flex-column align-items-center"
              style="flex: 1; max-width: 80px"
            >
              <!-- Bars Container -->
              <div
                class="d-flex align-items-end mb-2"
                style="height: 200px; position: relative"
              >
                <!-- Job Applied Bar (Purple) -->
                <div
                  class="chart-bar me-1 rounded-top"
                  :style="{
                    height: animatedHeights[index]?.applied + 'px',
                    backgroundColor: '#8b5cf6',
                    width: '20px',
                    transition: 'height 1s ease-in-out',
                    transitionDelay: index * 100 + 'ms',
                  }"
                ></div>

                <!-- Job View Bar (Orange) -->
                <div
                  class="chart-bar rounded-top"
                  :style="{
                    height: animatedHeights[index]?.view + 'px',
                    backgroundColor: '#f59e0b',
                    width: '20px',
                    transition: 'height 1s ease-in-out',
                    transitionDelay: index * 100 + 50 + 'ms',
                  }"
                ></div>

                <!-- Hover tooltip -->
                <div
                  v-if="hoveredBar === index"
                  class="position-absolute bg-dark text-white px-2 py-1 rounded small"
                  style="
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                    white-space: nowrap;
                  "
                >
                  <div>Job View: {{ day.jobView }}</div>
                  <div>Job Applied: {{ day.jobApplied }}</div>
                </div>
              </div>

              <!-- Day Label -->
              <div class="text-muted small">{{ day.day }}</div>
            </div>
          </div>

          <!-- Chart Legend -->
          <div class="d-flex justify-content-center mt-3">
            <div class="d-flex align-items-center me-4">
              <div
                class="rounded me-2"
                style="width: 12px; height: 12px; background-color: #f59e0b"
              ></div>
              <span class="small text-muted">Job View</span>
            </div>
            <div class="d-flex align-items-center">
              <div
                class="rounded me-2"
                style="width: 12px; height: 12px; background-color: #8b5cf6"
              ></div>
              <span class="small text-muted">Job Applied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const timePeriod = ref("week");
const activeTab = ref("overview");
const hoveredBar = ref(null);
const animatedHeights = ref([]);

const chartData = ref([
  { day: "Mon", jobView: 122, jobApplied: 34 },
  { day: "Tue", jobView: 89, jobApplied: 45 },
  { day: "Wed", jobView: 156, jobApplied: 28 },
  { day: "Thu", jobView: 134, jobApplied: 67 },
  { day: "Fri", jobView: 178, jobApplied: 89 },
  { day: "Sat", jobView: 98, jobApplied: 23 },
  { day: "Sun", jobView: 112, jobApplied: 45 },
]);

const maxValue = 200; // Maximum height for scaling

const calculateHeight = (value) => {
  return (value / maxValue) * 180; // Scale to max 180px height
};

const animateChart = () => {
  // Reset heights
  animatedHeights.value = chartData.value.map(() => ({ view: 0, applied: 0 }));

  // Animate after a short delay
  setTimeout(() => {
    animatedHeights.value = chartData.value.map((day) => ({
      view: calculateHeight(day.jobView),
      applied: calculateHeight(day.jobApplied),
    }));
  }, 100);
};

onMounted(() => {
  animateChart();
});

watch(timePeriod, () => {
  animateChart();
});

watch(activeTab, () => {
  animateChart();
});
</script>

<style scoped>
.chart-bar {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.chart-bar-container:hover .chart-bar {
  opacity: 0.9;
}

.nav-link.active {
  font-weight: 600;
}

.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>

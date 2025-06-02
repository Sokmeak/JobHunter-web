<template>
  <div class="card h-100 shadow-sm">
    <div class="card-body">
      <h5 class="card-title text-muted mb-4">Hired & Interviewed Status</h5>
      <div
        v-if="statusData[0].name !== 'No Applications'"
        class="d-flex align-items-center justify-content-between"
      >
        <div class="chart-container" style="width: 140px; height: 140px">
          <canvas :id="chartId"></canvas>
        </div>
        <div class="status-legend ms-4">
          <div
            v-for="(status, index) in statusData"
            :key="index"
            class="mb-2 d-flex align-items-center"
          >
            <div
              class="status-indicator me-2"
              :style="{ backgroundColor: status.color }"
            ></div>
            <div>
              <div class="fw-bold">{{ percentage(status.value) }}%</div>
              <div class="small text-muted">{{ status.name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-muted py-4">
        No Hired or Interviewed applications found.
      </div>
      <div class="mt-4">
        <router-link
          to="/applications"
          class="text-decoration-none text-primary d-inline-flex align-items-center"
        >
          View All Applications
          <i class="bi bi-arrow-right ms-1"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useApplicationStore } from "@/stores/ApplicantStore/Applications";
import Chart from "chart.js/auto";

const props = defineProps({
  statusData: {
    type: Array,
    required: true,
    default: () => [{ name: "No Applications", value: 1, color: "#e5e7eb" }],
  },
});

const chartId = ref(`status-chart-${Math.random().toString(36).substr(2, 9)}`);
let chartInstance = null;

const applicationStore = useApplicationStore();

// Calculate total applications for percentage
const totalApplications = computed(() => {
  return applicationStore.applications.length;
});

// Calculate percentage for a given value
const percentage = (value) => {
  return totalApplications.value
    ? ((value / totalApplications.value) * 100).toFixed(1)
    : 0;
};

// Chart.js configuration
const chartConfig = computed(() => ({
  type: "doughnut",
  data: {
    labels: props.statusData.map((item) => item.name),
    datasets: [
      {
        data: props.statusData.map((item) => item.value),
        backgroundColor: props.statusData.map((item) => item.color),
        borderWidth: 0,
        hoverOffset: 15,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "65%",
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${percentage(context.raw)}%`,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  },
}));

// Initialize or update chart
const renderChart = () => {
  if (props.statusData[0].name === "No Applications") return;
  const ctx = document.getElementById(chartId.value).getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(ctx, chartConfig.value);
};

// Watch for statusData changes
watch(
  () => props.statusData,
  () => {
    renderChart();
  },
  { deep: true }
);

onMounted(() => {
  renderChart();
});
</script>

<style scoped>
.card {
  border: none;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-3px);
}

.chart-container {
  position: relative;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.status-legend {
  max-width: 180px;
}

.text-primary:hover {
  text-decoration: underline;
}

@media (max-width: 576px) {
  .d-flex {
    flex-direction: column;
    align-items: center;
  }
  .status-legend {
    margin-top: 1rem;
    margin-left: 0;
    text-align: center;
  }
  .chart-container {
    width: 120px;
    height: 120px;
  }
}
</style>

<template>
  <div class="card h-100">
    <div class="card-header bg-white border-bottom">
      <div class="d-flex flex-column">
        <h5 class="card-title mb-1 fw-semibold text-dark">Job Posting</h5>
        <p class="card-text mb-0 text-muted small">
          Monthly job posting activity
        </p>
      </div>
    </div>

    <div class="card-body">
      <div class="chart-container position-relative">
        <canvas ref="chartCanvas"></canvas>
      </div>

      <div class="d-flex justify-content-center mt-3">
        <div class="d-flex align-items-center">
          <div
            class="legend-color me-2"
            style="background-color: #f59e0b"
          ></div>
          <span class="text-muted small">Job Posting</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data: [65, 78, 52, 91, 43, 86],
        },
      ],
    }),
  },
  period: {
    type: String,
    default: "last-month",
  },
});

const chartCanvas = ref(null);
let chart = null;

const initChart = () => {
  if (chart) {
    chart.destroy();
  }

  const ctx = chartCanvas.value.getContext("2d");

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.data.labels,
      datasets: [
        {
          label: "Job Posting",
          data: props.data.datasets[0].data,
          backgroundColor: "#f59e0b",
          borderRadius: 4,
          borderSkipped: false,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: 10,
          titleFont: {
            size: 14,
            weight: "bold",
          },
          bodyFont: {
            size: 13,
          },
          displayColors: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "#f3f4f6",
          },
          ticks: {
            color: "#9ca3af",
            font: {
              size: 12,
            },
            padding: 10,
          },
          border: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: "#6b7280",
            font: {
              size: 12,
            },
          },
          border: {
            display: false,
          },
        },
      },
    },
  });
};

const updateChart = () => {
  if (!chart) return;

  chart.data.labels = props.data.labels;
  chart.data.datasets[0].data = props.data.datasets[0].data;
  chart.update();
};

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
  }
});

watch(
  () => props.data,
  () => {
    updateChart();
  },
  { deep: true }
);

watch(
  () => props.period,
  () => {
    updateChart();
  }
);
</script>

<style scoped>
.chart-container {
  height: 300px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: #f59e0b;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header {
  padding: 1rem 1.25rem 0.75rem;
}
</style>

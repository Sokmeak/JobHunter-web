<template>
  <div class="card h-100">
    <div class="card-header bg-white border-bottom">
      <div class="d-flex flex-column">
        <h5 class="card-title mb-1 fw-semibold text-dark">Job Categories</h5>
        <p class="card-text mb-0 text-muted small">
          Distribution of job postings by category
        </p>
      </div>
    </div>

    <div class="card-body d-flex flex-column">
      <div class="chart-container flex-grow-1 position-relative">
        <Bar
          :data="chartData"
          :options="chartOptions"
          ref="chart"
          class="chart-canvas"
        />
      </div>
      <div
        class="chart-legend mt-3 d-flex flex-wrap justify-content-center gap-2"
      >
        <div
          v-for="(category, index) in categories"
          :key="category.name"
          class="legend-item d-flex align-items-center"
        >
          <div
            class="legend-color me-2"
            :style="{ backgroundColor: colors[index] }"
          ></div>
          <span class="legend-label small"
            >{{ category.name }} - {{ category.value }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      labels: ["Technology", "Healthcare", "Finance", "Education", "Marketing"],
      datasets: [
        {
          data: [45, 32, 28, 22, 18],
        },
      ],
    }),
  },
});

const colors = [
  "#4640de", // #4640de (Tech)
  "#56cdad", // #56cdad (Marketing)
  "#26a4ff", // #26a4ff (Finance)
  "#ffb836", // #ffb836 (Health Care)
  "#ff6550", // #ff6550 (Education)
];

const chartData = computed(() => ({
  labels: props.data.labels,
  datasets: [
    {
      data: props.data.datasets[0].data,
      backgroundColor: colors,
      borderWidth: 0,
      borderRadius: 10,
    },
  ],
}));

const chartOptions = ref({
  indexAxis: "y", // Makes the bar chart horizontal
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false, // Disable default legend as we use custom legend
    },
    tooltip: {
      backgroundColor: "var(--neutral-color)",
      titleColor: "#fff",
      bodyColor: "#fff",
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        color: "var(--tertiary-color)",
      },
      ticks: {
        color: "var(--neutral-color)",
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "var(--neutral-color)",
      },
    },
  },
});

const categories = computed(() => {
  return props.data.labels.map((label, index) => ({
    name: label,
    value: props.data.datasets[0].data[index],
  }));
});
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}

.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header {
  padding: 1rem 1.25rem 0.75rem;
}

.card-title {
  font-size: 1.25rem;
  color: var(--neutral-color);
}

.card-text {
  color: var(--secondary-color);
}

.chart-container {
  min-height: 200px;
  max-height: 300px;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}

.legend-item {
  font-size: 0.875rem;
  color: var(--neutral-color);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-label {
  font-size: 0.875rem;
  color: var(--neutral-color);
}
</style>

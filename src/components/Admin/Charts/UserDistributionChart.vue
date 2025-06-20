<template>
  <div class="chart-wrapper">
    <div class="chart-header mb-3">
      <div class="chart-title-section">
        <h3 class="chart-title">User Distribution</h3>
        <p class="chart-subtitle">Breakdown of user types</p>
      </div>
    </div>

    <div class="chart-content d-flex flex-column align-items-center">
      <div class="chart-container position-relative">
        <Doughnut
          :data="chartData"
          :options="chartOptions"
          ref="chart"
          class="chart-canvas"
        />
      </div>

      <div class="chart-legend mt-3 d-flex justify-content-center">
        <div class="legend-item d-flex align-items-center me-3">
          <div
            class="legend-color me-2"
            style="background-color: var(--purple-accent-color)"
          ></div>
          <span class="legend-label">Job Seeker - 55%</span>
        </div>
        <div class="legend-item d-flex align-items-center">
          <div
            class="legend-color me-2"
            style="background-color: var(--green-accent-color)"
          ></div>
          <span class="legend-label">Employer - 45%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);
// data should be passed as props

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      labels: ["Job Seeker", "Employer"],
      datasets: [
        {
          data: [55, 45],
          backgroundColor: [
            "var(--purple-accent-color)",
            "var(--green-accent-color)",
          ],
          borderWidth: 0,
        },
      ],
    }),
  },
});

const chartData = ref(props.data);

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  cutout: "50%",
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

.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chart-header {
  margin-bottom: 1.5rem;
}

.chart-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--neutral-color);
  margin: 0;
}

.chart-subtitle {
  font-size: 0.875rem;
  color: var(--secondary-color);
  margin: 0;
}

.chart-content {
  flex: 1;
}

.chart-container {
  width: 200px;
  height: 200px;
}

.chart-canvas {
  max-width: 200px;
  max-height: 200px;
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

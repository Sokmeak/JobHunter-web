<template>
  <div class="chart-wrapper">
    <div class="chart-header">
      <div class="chart-title-section">
        <h3 class="chart-title">Application Submitted</h3>
        <p class="chart-subtitle">Monthly application Submitted by user</p>
      </div>
      <div class="chart-value">{{ totalApplications }}</div>
    </div>

    <div class="chart-content">
      <Line
        :data="chartData"
        :options="chartOptions"
        :plugins="chartPlugins"
        ref="chartRef"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Applications",
          data: [120, 190, 300, 500, 200, 300, 450, 320, 280, 400, 350, 600],
          borderColor: "#10b981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#10b981",
          pointHoverBackgroundColor: "#374151",
          pointHoverBorderColor: "#374151",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    }),
  },
  period: {
    type: String,
    default: "last-month",
  },
  className: {
    type: String,
    default: "",
  },
});

const chartRef = ref(null);

// Computed properties
const totalApplications = computed(() => {
  if (props.data?.datasets?.[0]?.data) {
    return props.data.datasets[0].data.reduce((sum, value) => sum + value, 0);
  }
  return 1600; // fallback value
});

const chartData = computed(() => ({
  labels: props.data.labels,
  datasets: props.data.datasets.map((dataset) => ({
    ...dataset,
    borderColor: "#10b981",
    backgroundColor: "rgba(16, 185, 129, 0.1)",
    tension: 0.4,
    fill: true,
    pointBackgroundColor: "#10b981",
    pointBorderColor: "#10b981",
    pointHoverBackgroundColor: "#374151",
    pointHoverBorderColor: "#374151",
    pointRadius: 4,
    pointHoverRadius: 6,
    borderWidth: 3,
  })),
}));

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    intersect: false,
    mode: "index",
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "#374151",
      titleColor: "#ffffff",
      bodyColor: "#ffffff",
      borderColor: "#374151",
      borderWidth: 1,
      cornerRadius: 6,
      displayColors: false,
      padding: 12,
      titleFont: {
        size: 10,
        weight: "normal",
      },
      bodyFont: {
        size: 12,
        weight: "bold",
      },
      callbacks: {
        title: function () {
          return "Applicants";
        },
        label: function (context) {
          return context.parsed.y.toString();
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        color: "#9ca3af",
        font: {
          size: 12,
          family: "Inter",
        },
        padding: 10,
      },
    },
    y: {
      display: true,
      grid: {
        color: "#f3f4f6",
        drawBorder: false,
      },
      ticks: {
        color: "#9ca3af",
        font: {
          size: 12,
          family: "Inter",
        },
        padding: 10,
        callback: function (value) {
          return Math.round(value);
        },
      },
    },
  },
  elements: {
    point: {
      hoverRadius: 6,
    },
  },
}));

const chartPlugins = ref([
  {
    id: "customHover",
    afterDatasetsDraw: (chart) => {
      const { ctx, tooltip } = chart;

      if (tooltip._active && tooltip._active.length) {
        const activePoint = tooltip._active[0];
        const { x, y } = activePoint.element;

        // Draw custom hover point
        ctx.save();
        ctx.fillStyle = "#374151";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
      }
    },
  },
]);

// Watch for data changes
watch(
  () => props.data,
  () => {
    if (chartRef.value) {
      chartRef.value.chart.update();
    }
  },
  { deep: true }
);

watch(
  () => props.period,
  () => {
    if (chartRef.value) {
      chartRef.value.chart.update();
    }
  }
);
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --neutral-color: #25324b;
  --green-accent-color: #56cdad;
}

.chart-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: "Inter", sans-serif;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.chart-title-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chart-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--neutral-color);
  margin: 0;
}

.chart-subtitle {
  font-size: 12px;
  color: #6b7280;
  margin: 0;
}

.chart-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--neutral-color);
}

.chart-content {
  position: relative;
  flex: 1;
  height: 300px;
  min-height: 300px;
}
.chart-canvas {
  width: 100%;
  height: 100%;
}
.chart-legend {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
</style>

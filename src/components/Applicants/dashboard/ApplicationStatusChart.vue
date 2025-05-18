<template>
  <div class="card h-100">
    <div class="card-body">
      <h5 class="card-title text-muted">Jobs Applied Status</h5>
      <div class="d-flex align-items-center justify-content-center mt-4">
        <div class="position-relative" style="width: 120px; height: 120px">
          <!-- Simple donut chart representation -->
          <div class="donut-chart">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path
                class="circle-bg"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="circle"
                :stroke="statusData[0].color"
                :stroke-dasharray="`${statusData[0].value}, 100`"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>
        </div>
        <div class="ms-4">
          <div v-for="(status, index) in statusData" :key="index" class="mb-3">
            <div class="d-flex align-items-center">
              <div
                class="status-indicator me-2"
                :style="{ backgroundColor: status.color }"
              ></div>
              <div>
                <div class="fw-bold">{{ status.value }}%</div>
                <div class="small text-muted">{{ status.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <a
          href="#"
          class="text-decoration-none text-primary d-inline-flex align-items-center"
        >
          View All Applications
          <i class="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  statusData: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.circular-chart {
  display: block;
  margin: 0 auto;
  max-width: 100%;
}

.circle-bg {
  fill: none;
  stroke: #dee2e6;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 3.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>

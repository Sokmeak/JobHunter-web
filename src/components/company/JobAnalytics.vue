<template>
  <div class="job-analytics">
    <div class="row g-4 mb-4">
      <!-- Total Views -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h6 class="mb-0 fw-bold">Total Views</h6>
              <div
                class="bg-info rounded-circle p-2"
                style="
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <i class="bi bi-eye text-white"></i>
              </div>
            </div>
            <h2 class="mb-2 fw-bold" style="font-size: 2.5rem">23,564</h2>
            <div class="d-flex align-items-center">
              <span class="text-success small me-1">
                <i class="bi bi-triangle-fill" style="font-size: 8px"></i> 6.4%
              </span>
              <span class="text-muted small">vs last day</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Total Applied -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h6 class="mb-0 fw-bold">Total Applied</h6>
              <div
                class="bg-primary rounded-circle p-2"
                style="
                  width: 40px;
                  height: 40px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <i class="bi bi-file-earmark text-white"></i>
              </div>
            </div>
            <h2 class="mb-2 fw-bold" style="font-size: 2.5rem">132</h2>
            <div class="d-flex align-items-center">
              <span class="text-danger small me-1">
                <i
                  class="bi bi-triangle-fill"
                  style="font-size: 8px; transform: rotate(180deg)"
                ></i>
                0.4%
              </span>
              <span class="text-muted small">vs last day</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Traffic Channel -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h6 class="mb-3 fw-bold">Traffic channel</h6>
            <div
              class="d-flex align-items-center justify-content-center mb-3"
              style="height: 120px"
            >
              <div class="position-relative">
                <!-- Donut Chart -->
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="20"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#f59e0b"
                    stroke-width="20"
                    stroke-dasharray="150.8 314.16"
                    stroke-dashoffset="0"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#3b82f6"
                    stroke-width="20"
                    stroke-dasharray="72.38 314.16"
                    stroke-dashoffset="-150.8"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#8b5cf6"
                    stroke-width="20"
                    stroke-dasharray="75.4 314.16"
                    stroke-dashoffset="-223.18"
                    transform="rotate(-90 60 60)"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#10b981"
                    stroke-width="20"
                    stroke-dasharray="15.7 314.16"
                    stroke-dashoffset="-298.58"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div
                  class="position-absolute top-50 start-50 translate-middle text-center"
                >
                  <div class="fw-bold">243</div>
                </div>
              </div>
            </div>
            <div class="row g-2 small">
              <div class="col-6">
                <div
                  class="d-flex align-items-center justify-content-between mb-1"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded me-2"
                      style="width: 8px; height: 8px; background-color: #f59e0b"
                    ></div>
                    <span class="text-muted">Direct</span>
                  </div>
                  <span class="fw-medium">48%</span>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded me-2"
                      style="width: 8px; height: 8px; background-color: #8b5cf6"
                    ></div>
                    <span class="text-muted">Organic</span>
                  </div>
                  <span class="fw-medium">24%</span>
                </div>
              </div>
              <div class="col-6">
                <div
                  class="d-flex align-items-center justify-content-between mb-1"
                >
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded me-2"
                      style="width: 8px; height: 8px; background-color: #3b82f6"
                    ></div>
                    <span class="text-muted">Social</span>
                  </div>
                  <span class="fw-medium">23%</span>
                </div>
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded me-2"
                      style="width: 8px; height: 8px; background-color: #10b981"
                    ></div>
                    <span class="text-muted">Other</span>
                  </div>
                  <span class="fw-medium">5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Job Listing View Stats -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h6 class="mb-0 fw-bold">Job Listing View stats</h6>
              <div class="dropdown">
                <button
                  class="btn btn-outline-secondary btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <i class="bi bi-chevron-down me-1"></i>Last 7 days
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Last 7 days</a></li>
                  <li><a class="dropdown-item" href="#">Last 30 days</a></li>
                  <li><a class="dropdown-item" href="#">Last 90 days</a></li>
                </ul>
              </div>
            </div>

            <!-- Line Chart -->
            <div
              class="chart-container"
              style="height: 300px; position: relative"
            >
              <svg width="100%" height="100%" viewBox="0 0 600 300">
                <!-- Grid lines -->
                <defs>
                  <pattern
                    id="grid"
                    width="60"
                    height="50"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 60 0 L 0 0 0 50"
                      fill="none"
                      stroke="#f3f4f6"
                      stroke-width="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <!-- Y-axis labels -->
                <text
                  x="30"
                  y="50"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  1500
                </text>
                <text
                  x="30"
                  y="100"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  1250
                </text>
                <text
                  x="30"
                  y="150"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  1000
                </text>
                <text
                  x="30"
                  y="200"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  750
                </text>
                <text
                  x="30"
                  y="250"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  500
                </text>
                <text
                  x="30"
                  y="300"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  250
                </text>

                <!-- Animated Line -->
                <path
                  d="M 80 200 Q 140 180 200 160 Q 260 140 320 120 Q 380 100 440 80 Q 500 100 560 90"
                  fill="none"
                  stroke="#10b981"
                  stroke-width="3"
                  stroke-dasharray="1000"
                  stroke-dashoffset="1000"
                  class="animated-line"
                />

                <!-- Data points -->
                <circle
                  cx="80"
                  cy="200"
                  r="4"
                  fill="#10b981"
                  class="data-point"
                  style="animation-delay: 0.5s"
                />
                <circle
                  cx="200"
                  cy="160"
                  r="4"
                  fill="#10b981"
                  class="data-point"
                  style="animation-delay: 1s"
                />
                <circle
                  cx="320"
                  cy="120"
                  r="4"
                  fill="#10b981"
                  class="data-point"
                  style="animation-delay: 1.5s"
                />
                <circle
                  cx="440"
                  cy="80"
                  r="4"
                  fill="#10b981"
                  class="data-point"
                  style="animation-delay: 2s"
                />
                <circle
                  cx="560"
                  cy="90"
                  r="4"
                  fill="#10b981"
                  class="data-point"
                  style="animation-delay: 2.5s"
                />

                <!-- Tooltip -->
                <g class="tooltip" style="opacity: 0">
                  <rect
                    x="430"
                    y="40"
                    width="80"
                    height="40"
                    fill="#374151"
                    rx="4"
                  />
                  <text
                    x="470"
                    y="55"
                    text-anchor="middle"
                    fill="white"
                    class="small"
                  >
                    Views
                  </text>
                  <text
                    x="470"
                    y="70"
                    text-anchor="middle"
                    fill="white"
                    class="small fw-bold"
                  >
                    243
                  </text>
                </g>

                <!-- X-axis labels -->
                <text
                  x="80"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  19 Jul
                </text>
                <text
                  x="160"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  20 Jul
                </text>
                <text
                  x="240"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  21 Jul
                </text>
                <text
                  x="320"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  22 Jul
                </text>
                <text
                  x="400"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  23 Jul
                </text>
                <text
                  x="480"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  24 Jul
                </text>
                <text
                  x="560"
                  y="320"
                  text-anchor="middle"
                  class="small text-muted"
                >
                  25 Jul
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Visitors by Country -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h6 class="mb-4 fw-bold">Visitors by country</h6>
            <div class="country-list">
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center">
                  <span class="me-3">🇺🇸</span>
                  <span>USA</span>
                </div>
                <span class="fw-medium">3,240</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center">
                  <span class="me-3">🇫🇷</span>
                  <span>France</span>
                </div>
                <span class="fw-medium">3,188</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center">
                  <span class="me-3">🇮🇹</span>
                  <span>Italy</span>
                </div>
                <span class="fw-medium">2,938</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center">
                  <span class="me-3">🇩🇪</span>
                  <span>Germany</span>
                </div>
                <span class="fw-medium">2,624</span>
              </div>
              <div
                class="d-flex align-items-center justify-content-between mb-3"
              >
                <div class="d-flex align-items-center">
                  <span class="me-3">🇯🇵</span>
                  <span>Japan</span>
                </div>
                <span class="fw-medium">2,414</span>
              </div>
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                  <span class="me-3">🇳🇱</span>
                  <span>Netherlands</span>
                </div>
                <span class="fw-medium">1,936</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Analytics component with animated charts
</script>

<style scoped>
.animated-line {
  animation: drawLine 3s ease-in-out forwards;
}

.data-point {
  opacity: 0;
  animation: fadeIn 0.5s ease-in-out forwards;
}

.tooltip {
  transition: opacity 0.3s ease;
}

@keyframes drawLine {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

.chart-container:hover .tooltip {
  opacity: 1;
}
</style>

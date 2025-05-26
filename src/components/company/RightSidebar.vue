<template>
  <div class="right-sidebar">
    <!-- Job Views Card -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h6 class="mb-0">Job Views</h6>
          <div class="bg-warning-subtle rounded-circle p-2">
            <i class="bi bi-eye text-warning"></i>
          </div>
        </div>
        <h2 class="mb-2 fw-bold">2,342</h2>
        <div class="d-flex align-items-center">
          <span class="text-success small me-1">
            <i class="bi bi-arrow-up"></i>6.4%
          </span>
          <span class="text-muted small">This Week</span>
        </div>
      </div>
    </div>

    <!-- Job Applied Card -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h6 class="mb-0">Job Applied</h6>
          <div class="bg-primary-subtle rounded-circle p-2">
            <i class="bi bi-file-earmark text-primary"></i>
          </div>
        </div>
        <h2 class="mb-2 fw-bold">654</h2>
        <div class="d-flex align-items-center">
          <span class="text-danger small me-1">
            <i class="bi bi-arrow-down"></i>0.5%
          </span>
          <span class="text-muted small">This Week</span>
        </div>
      </div>
    </div>

    <!-- Job Open Card -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <h6 class="mb-3">Job Open</h6>
        <div class="text-center">
          <h1 class="display-3 fw-bold mb-2">12</h1>
          <p class="text-muted mb-0">Jobs Opened</p>
        </div>
      </div>
    </div>

    <!-- Applicants Summary -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-4">
        <h6 class="mb-3">Applicants Summary</h6>
        <div class="text-center mb-4">
          <h1 class="display-3 fw-bold mb-2">67</h1>
          <p class="text-muted mb-0">Applicants</p>
        </div>

        <!-- Progress Bar -->
        <div class="progress mb-3" style="height: 8px">
          <div
            class="progress-bar"
            style="width: 30%; background-color: #8b5cf6"
          ></div>
          <div
            class="progress-bar"
            style="width: 16%; background-color: #10b981"
          ></div>
          <div
            class="progress-bar"
            style="width: 15%; background-color: #3b82f6"
          ></div>
          <div
            class="progress-bar"
            style="width: 21%; background-color: #f59e0b"
          ></div>
          <div
            class="progress-bar"
            style="width: 18%; background-color: #ef4444"
          ></div>
        </div>

        <!-- Legend -->
        <div class="row g-2 small">
          <div class="col-6">
            <div class="d-flex align-items-center mb-2">
              <div
                class="rounded me-2"
                style="width: 8px; height: 8px; background-color: #8b5cf6"
              ></div>
              <span class="text-muted">Full Time</span>
              <span class="ms-auto fw-medium">45</span>
            </div>
            <div class="d-flex align-items-center mb-2">
              <div
                class="rounded me-2"
                style="width: 8px; height: 8px; background-color: #10b981"
              ></div>
              <span class="text-muted">Part-Time</span>
              <span class="ms-auto fw-medium">24</span>
            </div>
            <div class="d-flex align-items-center">
              <div
                class="rounded me-2"
                style="width: 8px; height: 8px; background-color: #3b82f6"
              ></div>
              <span class="text-muted">Remote</span>
              <span class="ms-auto fw-medium">22</span>
            </div>
          </div>
          <div class="col-6">
            <div class="d-flex align-items-center mb-2">
              <div
                class="rounded me-2"
                style="width: 8px; height: 8px; background-color: #f59e0b"
              ></div>
              <span class="text-muted">Internship</span>
              <span class="ms-auto fw-medium">32</span>
            </div>
            <div class="d-flex align-items-center">
              <div
                class="rounded me-2"
                style="width: 8px; height: 8px; background-color: #ef4444"
              ></div>
              <span class="text-muted">Contract</span>
              <span class="ms-auto fw-medium">30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Enhanced right sidebar with proper metrics
</script>

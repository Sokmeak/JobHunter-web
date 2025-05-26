<template>
  <div class="stat-cards mb-4">
    <!-- Header Text -->
    <div class="mb-4">
      <p class="text-muted mb-0">
        Here is your job listings statistic report from July 19 - July 25
      </p>
    </div>

    <!-- Stat Cards Row -->
    <div class="row g-4">
      <!-- New Candidates Card -->
      <div class="col-lg-4">
        <div
          class="card border-0 text-white position-relative overflow-hidden"
          style="
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            min-height: 120px;
          "
        >
          <div
            class="card-body d-flex justify-content-between align-items-center p-4"
          >
            <div>
              <h2 class="mb-2 fw-bold display-4">76</h2>
              <p class="mb-0 fs-6">New candidates to review</p>
            </div>
            <i class="bi bi-chevron-right fs-3 opacity-75"></i>
          </div>
          <!-- Decorative background element -->
          <div
            class="position-absolute top-0 end-0 opacity-10"
            style="font-size: 8rem; margin-top: -2rem; margin-right: -2rem"
          >
            <i class="bi bi-people"></i>
          </div>
        </div>
      </div>

      <!-- Schedule Card -->
      <div class="col-lg-4">
        <div
          class="card border-0 text-white position-relative overflow-hidden"
          style="
            background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
            min-height: 120px;
          "
        >
          <div
            class="card-body d-flex justify-content-between align-items-center p-4"
          >
            <div>
              <h2 class="mb-2 fw-bold display-4">3</h2>
              <p class="mb-0 fs-6">Schedule for today</p>
            </div>
            <i class="bi bi-chevron-right fs-3 opacity-75"></i>
          </div>
          <!-- Decorative background element -->
          <div
            class="position-absolute top-0 end-0 opacity-10"
            style="font-size: 8rem; margin-top: -2rem; margin-right: -2rem"
          >
            <i class="bi bi-calendar"></i>
          </div>
        </div>
      </div>

      <!-- Messages Card -->
      <div class="col-lg-4">
        <div
          class="card border-0 text-white position-relative overflow-hidden"
          style="
            background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
            min-height: 120px;
          "
        >
          <div
            class="card-body d-flex justify-content-between align-items-center p-4"
          >
            <div>
              <h2 class="mb-2 fw-bold display-4">24</h2>
              <p class="mb-0 fs-6">Messages received</p>
            </div>
            <i class="bi bi-chevron-right fs-3 opacity-75"></i>
          </div>
          <!-- Decorative background element -->
          <div
            class="position-absolute top-0 end-0 opacity-10"
            style="font-size: 8rem; margin-top: -2rem; margin-right: -2rem"
          >
            <i class="bi bi-chat-dots"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Enhanced stat cards with better design
</script>

<style scoped>
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>

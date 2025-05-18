<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Upcoming Interviews</h5>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <div class="d-flex align-items-center">
          <span class="fw-medium">Today,</span>
          <span class="ms-1">26 November</span>
        </div>
        <div>
          <button class="btn btn-sm btn-light me-1">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="btn btn-sm btn-light">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div class="timeline">
        <div
          v-for="(interview, index) in interviews"
          :key="index"
          class="timeline-item"
        >
          <div class="time-column">{{ interview.time }}</div>
          <div class="content-column">
            <template v-if="!interview.isEmpty">
              <div class="interview-card bg-light p-3 rounded">
                <div class="d-flex align-items-center">
                  <div
                    class="bg-secondary rounded-circle me-3"
                    style="width: 40px; height: 40px"
                  ></div>
                  <div>
                    <p class="mb-0 fw-medium">
                      {{ interview.interviewer.name }}
                    </p>
                    <p class="mb-0 small text-muted">
                      {{ interview.interviewer.position }}
                    </p>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="border-top border-2 my-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  interviews: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.timeline {
  margin-top: 1rem;
}

.timeline-item {
  display: flex;
  margin-bottom: 1rem;
}

.time-column {
  width: 100px;
  color: #6c757d;
  padding-top: 0.5rem;
}

.content-column {
  flex: 1;
}
</style>

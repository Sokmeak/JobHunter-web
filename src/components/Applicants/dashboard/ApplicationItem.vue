<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div class="d-flex align-items-center">
      <div
        :class="`bg-${application.logoColor}-subtle rounded d-flex align-items-center justify-content-center me-3`"
        style="width: 48px; height: 48px"
      >
        <i :class="`bi bi-box text-${application.logoColor}`"></i>
      </div>
      <div>
        <p class="mb-0 fw-medium">{{ application.position }}</p>
        <p class="mb-0 small text-muted">
          {{ application.company }} • {{ application.location }} • {{ application.type }}
        </p>
      </div>
    </div>
    <div class="d-flex align-items-center">
      <div class="text-end me-3">
        <p class="mb-0 small text-muted">Date Applied</p>
        <p class="mb-0">{{ application.dateApplied }}</p>
      </div>
      <span
        :class="`badge bg-${application.statusClass}-subtle text-${application.statusClass} px-3 py-2 me-3`"
      >
        {{ application.status }}
      </span>
      <button class="btn btn-sm btn-light">
        <i class="bi bi-three-dots"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  application: {
    type: Object,
    required: true,
  },
});
</script>

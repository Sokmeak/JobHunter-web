<template>
  <div class="header-component d-flex justify-content-between align-items-center py-3 mb-4">
    <h1 class="h3 mb-0 fw-bold">{{ title }}</h1>
    <div class="d-flex align-items-center">
      <button class="btn btn-outline-primary me-2" v-if="showBackButton">
        Back to homepage
      </button>
      <button class="btn btn-link position-relative">
        <i class="bi bi-bell fs-5"></i>
        <span v-if="notificationCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {{ notificationCount }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    showBackButton: {
      type: Boolean,
      default: true
    },
    notificationCount: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.header-component {
  border-bottom: 1px solid #eee;
}
</style>
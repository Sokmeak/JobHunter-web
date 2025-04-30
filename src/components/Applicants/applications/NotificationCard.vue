<template>
  <div class="notification-card mb-4 position-relative">
    <button
      class="btn-close position-absolute top-0 end-0 m-3"
      @click="dismiss"
    ></button>
    <div class="d-flex">
      <div class="notification-icon me-3">
        <div class="icon-circle">
          <i class="bi bi-file-earmark-text"></i>
        </div>
      </div>
      <div class="notification-content">
        <h5>New Feature</h5>
        <p class="mb-1">
          You can request a follow-up 7 days after applying for a job if the
          application status is in review.
        </p>
        <p class="mb-0 text-muted">Only one follow-up is allowed per job.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationCard",
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    dismiss() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.notification-card {
  background-color: #f8f9fe;
  border-radius: 8px;
  padding: 15px;
}

.icon-circle {
  width: 40px;
  height: 40px;
  background-color: #e7e3fc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5138ee;
}

.notification-content h5 {
  color: #5138ee;
  font-size: 16px;
  margin-bottom: 8px;
}

.notification-content p {
  font-size: 14px;
}
</style>

<template>
  <div>
    <div class="section mb-4">
      <h5 class="mb-2">Basic Information</h5>
      <p class="text-muted mb-4">
        This is notifications preferences that you can update anytime.
      </p>
    </div>

    <div class="section mb-4">
      <h5 class="mb-3">Notifications</h5>
      <p class="text-muted mb-4">
        Customize your preferred notification settings
      </p>

      <div class="notification-option mb-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="applications"
            v-model="notificationSettings.applications"
          />
          <label class="form-check-label" for="applications">
            <div class="fw-bold">Applications</div>
            <div class="text-muted">
              These are notifications for jobs that you have applied to
            </div>
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="jobs"
            v-model="notificationSettings.jobs"
          />
          <label class="form-check-label" for="jobs">
            <div class="fw-bold">Jobs</div>
            <div class="text-muted">
              These are notifications for job openings that suit your profile
            </div>
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id="recommendations"
            v-model="notificationSettings.recommendations"
          />
          <label class="form-check-label" for="recommendations">
            <div class="fw-bold">Recommendations</div>
            <div class="text-muted">
              These are notifications for personalized recommendations from our
              recruiters
            </div>
          </label>
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-end">
      <button class="btn btn-primary" @click="updateNotifications">
        Update Email
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationSettings",
  props: {
    notifications: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      notificationSettings: {
        applications: this.notifications.applications,
        jobs: this.notifications.jobs,
        recommendations: this.notifications.recommendations,
      },
    };
  },
  methods: {
    updateNotifications() {
      this.$emit("update", this.notificationSettings);
    },
  },
};
</script>

<style scoped>
.section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 20px;
}

.notification-option {
  padding: 10px;
  border-radius: 6px;
}

.notification-option:hover {
  background-color: #f8f9fa;
}

.form-check-input:checked {
  background-color: #6366f1;
  border-color: #6366f1;
}

.form-check-label {
  cursor: pointer;
}
</style>

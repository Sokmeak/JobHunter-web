<!-- src/components/settings/NotificationsTab.vue -->
<template>
  <div class="notifications-tab">
    <div class="section mb-4">
      <h5 class="section-title">Notification Preferences</h5>
      <p class="text-muted">
        Choose how you'd like to be notified about activity
      </p>
      <hr />
    </div>

    <!-- Email Notifications -->
    <div class="notification-section mb-4">
      <h6 class="fw-medium mb-3">Email Notifications</h6>
      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="jobAlerts"
            v-model="notifications.email.jobAlerts"
          />
          <label class="form-check-label d-flex flex-column" for="jobAlerts">
            <span>Job Alerts</span>
            <small class="text-muted"
              >Get notified when new jobs match your profile</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="applicationUpdates"
            v-model="notifications.email.applicationUpdates"
          />
          <label
            class="form-check-label d-flex flex-column"
            for="applicationUpdates"
          >
            <span>Application Updates</span>
            <small class="text-muted"
              >Receive updates on your job applications</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="interviews"
            v-model="notifications.email.interviews"
          />
          <label class="form-check-label d-flex flex-column" for="interviews">
            <span>Interview Invitations</span>
            <small class="text-muted"
              >Be notified when you're invited to an interview</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="newsletters"
            v-model="notifications.email.newsletters"
          />
          <label class="form-check-label d-flex flex-column" for="newsletters">
            <span>Newsletters & Career Tips</span>
            <small class="text-muted"
              >Receive updates on job market trends and career advice</small
            >
          </label>
        </div>
      </div>
    </div>

    <!-- Push Notifications -->
    <div class="notification-section mb-4">
      <h6 class="fw-medium mb-3">Push Notifications</h6>
      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="pushJobAlerts"
            v-model="notifications.push.jobAlerts"
          />
          <label
            class="form-check-label d-flex flex-column"
            for="pushJobAlerts"
          >
            <span>Job Alerts</span>
            <small class="text-muted"
              >Get push notifications for new job matches</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="pushApplicationUpdates"
            v-model="notifications.push.applicationUpdates"
          />
          <label
            class="form-check-label d-flex flex-column"
            for="pushApplicationUpdates"
          >
            <span>Application Updates</span>
            <small class="text-muted"
              >Receive push notifications about your applications</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="pushMessages"
            v-model="notifications.push.messages"
          />
          <label class="form-check-label d-flex flex-column" for="pushMessages">
            <span>Messages</span>
            <small class="text-muted"
              >Get push notifications when you receive new messages</small
            >
          </label>
        </div>
      </div>
    </div>

    <!-- SMS Notifications -->
    <div class="notification-section mb-4">
      <h6 class="fw-medium mb-3">SMS Notifications</h6>
      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="smsInterviews"
            v-model="notifications.sms.interviews"
          />
          <label
            class="form-check-label d-flex flex-column"
            for="smsInterviews"
          >
            <span>Interview Reminders</span>
            <small class="text-muted"
              >Receive SMS reminders before scheduled interviews</small
            >
          </label>
        </div>
      </div>

      <div class="notification-option mb-3">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="smsApplicationUpdates"
            v-model="notifications.sms.applicationUpdates"
          />
          <label
            class="form-check-label d-flex flex-column"
            for="smsApplicationUpdates"
          >
            <span>Important Application Updates</span>
            <small class="text-muted"
              >Get SMS alerts for critical updates on your applications</small
            >
          </label>
        </div>
      </div>
    </div>

    <!-- Email Frequency -->
    <div class="notification-section mb-4">
      <h6 class="fw-medium mb-3">Email Frequency</h6>
      <div class="mb-3">
        <select class="form-select" v-model="emailFrequency">
          <option value="immediately">Immediately</option>
          <option value="daily">Daily Digest</option>
          <option value="weekly">Weekly Digest</option>
        </select>
        <small class="text-muted"
          >How often you want to receive email notifications</small
        >
      </div>
    </div>

    <!-- Save Button -->
    <div class="d-flex justify-content-end mt-4">
      <button class="btn btn-primary" @click="saveNotificationSettings">
        Save Preferences
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationsTab",
  data() {
    return {
      notifications: {
        email: {
          jobAlerts: true,
          applicationUpdates: true,
          interviews: true,
          newsletters: false,
        },
        push: {
          jobAlerts: true,
          applicationUpdates: true,
          messages: false,
        },
        sms: {
          interviews: false,
          applicationUpdates: false,
        },
      },
      emailFrequency: "immediately",
    };
  },
  methods: {
    saveNotificationSettings() {
      // Logic to save notification settings would go here
      console.log("Saving notification settings:", this.notifications);
      console.log("Email frequency:", this.emailFrequency);

      // Show success message or handle errors
      alert("Notification preferences saved successfully!");
    },
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.notification-section {
  padding-bottom: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.notification-section:last-child {
  border-bottom: none;
}
</style>

<template>
  <div class="notifications-settings">
    <div class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Notification Preferences</h5>
      </div>
      <div class="card-body">
        <!-- Email Notifications -->
        <div class="mb-4">
          <h6 class="fw-bold mb-3">Email Notifications</h6>
          <div class="row">
            <div class="col-md-6">
              <div
                class="form-check mb-3"
                v-for="(value, key) in notifications.email"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="key"
                  v-model="notifications.email[key]"
                />
                <label class="form-check-label" :for="key">
                  <strong>{{ emailLabels[key] }}</strong>
                  <div class="small text-muted">
                    {{ emailDescriptions[key] }}
                  </div>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="form-check mb-3"
                v-for="(value, key) in notifications.emailRight"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="key"
                  v-model="notifications.email[key]"
                />
                <label class="form-check-label" :for="key">
                  <strong>{{ emailLabels[key] }}</strong>
                  <div class="small text-muted">
                    {{ emailDescriptions[key] }}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <!-- Push Notifications -->
        <div class="mb-4">
          <h6 class="fw-bold mb-3">Push Notifications</h6>
          <div class="row">
            <div class="col-md-6">
              <div
                class="form-check mb-3"
                v-for="(value, key) in notifications.pushLeft"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'push-' + key"
                  v-model="notifications.push[key]"
                />
                <label class="form-check-label" :for="'push-' + key">
                  <strong>{{ pushLabels[key] }}</strong>
                  <div class="small text-muted">
                    {{ pushDescriptions[key] }}
                  </div>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div
                class="form-check mb-3"
                v-for="(value, key) in notifications.pushRight"
                :key="key"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="'push-' + key"
                  v-model="notifications.push[key]"
                />
                <label class="form-check-label" :for="'push-' + key">
                  <strong>{{ pushLabels[key] }}</strong>
                  <div class="small text-muted">
                    {{ pushDescriptions[key] }}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <!-- Notification Frequency -->
        <div class="mb-4">
          <h6 class="fw-bold mb-3">Notification Frequency</h6>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Email Digest Frequency</label
              >
              <select
                class="form-select"
                v-model="notifications.frequency.email"
              >
                <option value="immediate">Immediate</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="never">Never</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Report Frequency</label>
              <select
                class="form-select"
                v-model="notifications.frequency.reports"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end gap-2">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="resetDefaults"
          >
            Reset to Default
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="saveNotifications"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useNotificationsStore } from "@/stores/company/notifications";

const notificationsStore = useNotificationsStore();
const { notifications } = storeToRefs(notificationsStore);

// Labels & descriptions to keep template clean
const emailLabels = {
  newApplications: "New Applications",
  interviewReminders: "Interview Reminders",
  statusUpdates: "Application Status Updates",
  weeklyReports: "Weekly Reports",
  teamUpdates: "Team Updates",
  systemUpdates: "System Updates",
};
const emailDescriptions = {
  newApplications: "Get notified when someone applies to your jobs",
  interviewReminders: "Reminders for upcoming interviews",
  statusUpdates: "When applicant status changes",
  weeklyReports: "Weekly summary of hiring activity",
  teamUpdates: "When team members join or leave",
  systemUpdates: "Important system announcements",
};

// To split email notifications into 2 columns in UI
notifications.value.emailRight = {
  weeklyReports: notifications.value.email.weeklyReports,
  teamUpdates: notifications.value.email.teamUpdates,
  systemUpdates: notifications.value.email.systemUpdates,
};
notifications.value.emailLeft = {
  newApplications: notifications.value.email.newApplications,
  interviewReminders: notifications.value.email.interviewReminders,
  statusUpdates: notifications.value.email.statusUpdates,
};

// Similarly for push notifications
const pushLabels = {
  newApplications: "New Applications",
  interviews: "Interview Notifications",
  urgent: "Urgent Updates",
  messages: "Messages",
};
const pushDescriptions = {
  newApplications: "Instant notifications for new applications",
  interviews: "Upcoming interview reminders",
  urgent: "Critical system notifications",
  messages: "New messages from team members",
};

notifications.value.pushLeft = {
  newApplications: notifications.value.push.newApplications,
  interviews: notifications.value.push.interviews,
};
notifications.value.pushRight = {
  urgent: notifications.value.push.urgent,
  messages: notifications.value.push.messages,
};

const saveNotifications = () => {
  notificationsStore.saveNotifications();
};

const resetDefaults = () => {
  notificationsStore.resetDefaults();
};
</script>

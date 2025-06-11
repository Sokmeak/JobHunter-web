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
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="newApplications"
                  v-model="notifications.email.newApplications"
                />
                <label class="form-check-label" for="newApplications">
                  <strong>New Applications</strong>
                  <div class="small text-muted">
                    Get notified when someone applies to your jobs
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="interviewReminders"
                  v-model="notifications.email.interviewReminders"
                />
                <label class="form-check-label" for="interviewReminders">
                  <strong>Interview Reminders</strong>
                  <div class="small text-muted">
                    Reminders for upcoming interviews
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="statusUpdates"
                  v-model="notifications.email.statusUpdates"
                />
                <label class="form-check-label" for="statusUpdates">
                  <strong>Application Status Updates</strong>
                  <div class="small text-muted">
                    When applicant status changes
                  </div>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="weeklyReports"
                  v-model="notifications.email.weeklyReports"
                />
                <label class="form-check-label" for="weeklyReports">
                  <strong>Weekly Reports</strong>
                  <div class="small text-muted">
                    Weekly summary of hiring activity
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="teamUpdates"
                  v-model="notifications.email.teamUpdates"
                />
                <label class="form-check-label" for="teamUpdates">
                  <strong>Team Updates</strong>
                  <div class="small text-muted">
                    When team members join or leave
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="systemUpdates"
                  v-model="notifications.email.systemUpdates"
                />
                <label class="form-check-label" for="systemUpdates">
                  <strong>System Updates</strong>
                  <div class="small text-muted">
                    Important system announcements
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
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="pushNewApplications"
                  v-model="notifications.push.newApplications"
                />
                <label class="form-check-label" for="pushNewApplications">
                  <strong>New Applications</strong>
                  <div class="small text-muted">
                    Instant notifications for new applications
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="pushInterviews"
                  v-model="notifications.push.interviews"
                />
                <label class="form-check-label" for="pushInterviews">
                  <strong>Interview Notifications</strong>
                  <div class="small text-muted">
                    Upcoming interview reminders
                  </div>
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="pushUrgent"
                  v-model="notifications.push.urgent"
                />
                <label class="form-check-label" for="pushUrgent">
                  <strong>Urgent Updates</strong>
                  <div class="small text-muted">
                    Critical system notifications
                  </div>
                </label>
              </div>
              <div class="form-check mb-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="pushMessages"
                  v-model="notifications.push.messages"
                />
                <label class="form-check-label" for="pushMessages">
                  <strong>Messages</strong>
                  <div class="small text-muted">
                    New messages from team members
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
          <button type="button" class="btn btn-outline-secondary">
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

<script>
import { ref } from "vue";

export default {
  name: "Notifications",
  setup() {
    const notifications = ref({
      email: {
        newApplications: true,
        interviewReminders: true,
        statusUpdates: true,
        weeklyReports: true,
        teamUpdates: false,
        systemUpdates: true,
      },
      push: {
        newApplications: true,
        interviews: true,
        urgent: true,
        messages: false,
      },
      frequency: {
        email: "immediate",
        reports: "weekly",
      },
    });

    const saveNotifications = () => {
      alert("Notification preferences saved successfully!");
    };

    return {
      notifications,
      saveNotifications,
    };
  },
};
</script>

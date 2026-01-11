<template>
  <div class="container-fluid p-4">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="text-neutral mb-0">Notifications</h2>
      <button class="btn btn-primary" @click="markAllAsRead">
        <i class="bi bi-check2-all me-2"></i>
        Mark All Read
      </button>
    </div>

    <!-- Simple Filters -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <select v-model="filterType" class="form-select">
              <option value="all">All Notifications</option>
              <option value="unread">Unread Only</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications List -->
    <div class="card">
      <div class="list-group list-group-flush">
        <!-- Empty State -->
        <div v-if="filteredNotifications.length === 0" class="text-center py-5">
          <i class="bi bi-bell display-4 text-muted"></i>
          <p class="text-muted mt-3">No notifications found</p>
        </div>

        <!-- Notification Items -->
        <div
          v-for="notification in filteredNotifications"
          :key="notification.id"
          class="list-group-item"
          :class="{ 'bg-light': !notification.read }"
        >
          <div class="d-flex align-items-start">
            <!-- Icon -->
            <div class="me-3">
              <i :class="getIcon(notification.type)" class="fs-4"></i>
            </div>

            <!-- Content -->
            <div class="flex-grow-1">
              <div
                class="d-flex justify-content-between align-items-start mb-1"
              >
                <h6 class="mb-1 fw-semibold">{{ notification.title }}</h6>
                <div class="d-flex align-items-center gap-2">
                  <span
                    class="badge"
                    :class="getPriorityClass(notification.priority)"
                  >
                    {{ notification.priority }}
                  </span>
                  <small class="text-muted">{{
                    formatTime(notification.timestamp)
                  }}</small>
                </div>
              </div>

              <p class="mb-2 text-muted">{{ notification.message }}</p>

              <!-- Actions -->
              <div class="d-flex gap-2">
                <button
                  v-if="notification.actionRequired"
                  class="btn btn-sm btn-primary"
                  @click="handleAction(notification)"
                >
                  {{ getActionText(notification.type) }}
                </button>

                <button
                  class="btn btn-sm btn-outline-secondary"
                  @click="toggleRead(notification)"
                >
                  {{ notification.read ? "Mark Unread" : "Mark Read" }}
                </button>

                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="deleteNotification(notification.id)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

// Data
const notifications = ref([]);
const filterType = ref("all");

// Mock data
const mockNotifications = [
  {
    id: 1,
    type: "user",
    title: "New User Registration",
    message: "5 new users need approval",
    priority: "medium",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: true,
  },
  {
    id: 2,
    type: "security",
    title: "Security Alert",
    message: "Multiple failed login attempts detected",
    priority: "high",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    read: false,
    actionRequired: true,
  },
  {
    id: 3,
    type: "content",
    title: "Content Flagged",
    message: "3 job posts flagged for review",
    priority: "medium",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: true,
  },
  {
    id: 4,
    type: "system",
    title: "System Update",
    message: "Maintenance completed successfully",
    priority: "low",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionRequired: false,
  },
];

// Computed
const filteredNotifications = computed(() => {
  let filtered = notifications.value;

  if (filterType.value === "unread") {
    filtered = filtered.filter((n) => !n.read);
  } else if (filterType.value === "high") {
    filtered = filtered.filter((n) => n.priority === "high");
  }

  return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
});

// Methods
const getIcon = (type) => {
  const icons = {
    user: "bi bi-person-fill text-primary",
    security: "bi bi-shield-exclamation text-danger",
    content: "bi bi-flag-fill text-warning",
    system: "bi bi-gear-fill text-info",
  };
  return icons[type] || "bi bi-bell-fill text-secondary";
};

const getPriorityClass = (priority) => {
  const classes = {
    high: "bg-danger",
    medium: "bg-warning",
    low: "bg-info",
  };
  return classes[priority] || "bg-secondary";
};

const getActionText = (type) => {
  const actions = {
    user: "Review Users",
    security: "Investigate",
    content: "Review Content",
    system: "View Details",
  };
  return actions[type] || "View";
};

const formatTime = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now - time) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
  return `${Math.floor(diffInMinutes / 1440)}d ago`;
};

const markAllAsRead = () => {
  notifications.value.forEach((n) => (n.read = true));
};

const toggleRead = (notification) => {
  notification.read = !notification.read;
};

const deleteNotification = (id) => {
  const index = notifications.value.findIndex((n) => n.id === id);
  if (index > -1) {
    notifications.value.splice(index, 1);
  }
};

const handleAction = (notification) => {
  console.log("Action for:", notification.type);
  // Handle specific actions here
};

// Lifecycle
onMounted(() => {
  notifications.value = mockNotifications;
});
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --neutral-color: #25324b;
}

.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.btn-primary:hover {
  background-color: #3d37c7;
  border-color: #3d37c7;
}

.text-primary {
  color: var(--primary-color) !important;
}

.text-neutral {
  color: var(--neutral-color) !important;
}

.list-group-item {
  border-left: 4px solid transparent;
  transition: all 0.2s ease;
}

.list-group-item:hover {
  background-color: #f8f9fa !important;
}

.list-group-item.bg-light {
  border-left-color: var(--primary-color);
}
</style>

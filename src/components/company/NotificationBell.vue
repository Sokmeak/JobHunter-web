<template>
  <div class="notification-bell position-relative">
    <button
      class="btn btn-outline-secondary position-relative"
      @click="toggleNotifications"
      ref="notificationButton"
    >
      <i class="bi bi-bell"></i>
      <span
        v-if="unreadCount > 0"
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style="font-size: 0.6rem"
      >
        {{ unreadCount }}
      </span>
    </button>

    <!-- Notifications Dropdown -->
    <div
      v-if="showNotifications"
      class="notification-dropdown position-absolute bg-white border rounded shadow-lg"
      style="
        top: 100%;
        right: 0;
        width: 400px;
        max-height: 500px;
        overflow-y: auto;
        z-index: 1050;
      "
    >
      <div
        class="d-flex justify-content-between align-items-center p-3 border-bottom"
      >
        <h6 class="mb-0">Notifications</h6>
        <button class="btn btn-link text-primary p-0" @click="markAllAsRead">
          Mark all as read
        </button>
      </div>

      <div class="notification-list">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item p-3 border-bottom"
          :class="{ 'bg-light': !notification.read }"
          @click="handleNotification(notification.id)"
          style="cursor: pointer"
        >
          <div class="d-flex align-items-start">
            <img
              :src="notification.avatar"
              :alt="notification.sender"
              class="rounded-circle me-3"
              style="width: 40px; height: 40px; object-fit: cover"
            />
            <div class="flex-grow-1">
              <div class="d-flex align-items-center mb-1">
                <strong class="me-2">{{ notification.sender }}</strong>
                <span
                  v-if="notification.status"
                  class="badge rounded-pill"
                  :class="getStatusClass(notification.status)"
                >
                  {{ notification.status }}
                </span>
              </div>
              <p class="mb-1 text-muted small">{{ notification.message }}</p>

              <!-- Interview Details Card -->
              <div
                v-if="notification.type === 'interview'"
                class="interview-card bg-primary text-white rounded p-3 mt-2"
              >
                <h6 class="mb-2">{{ notification.interviewTitle }}</h6>
                <p class="mb-2 small">{{ notification.interviewRole }}</p>
                <div class="row">
                  <div class="col-6">
                    <div class="d-flex align-items-center mb-1">
                      <i class="bi bi-calendar me-2"></i>
                      <span class="small">Date</span>
                    </div>
                    <div class="fw-medium">
                      {{ notification.interviewDate }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center mb-1">
                      <i class="bi bi-clock me-2"></i>
                      <span class="small">Time</span>
                    </div>
                    <div class="fw-medium">
                      {{ notification.interviewTime }}
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center mt-2">
                  <img
                    :src="notification.interviewerAvatar"
                    :alt="notification.interviewer"
                    class="rounded-circle me-2"
                    style="width: 24px; height: 24px"
                  />
                  <div>
                    <div class="fw-medium small">
                      {{ notification.interviewer }}
                    </div>
                    <div class="small opacity-75">
                      {{ notification.interviewerEmail }}
                    </div>
                  </div>
                </div>
              </div>

              <small class="text-muted">{{ notification.time }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const showNotifications = ref(false);
const notificationButton = ref(null);

const notifications = ref([
  {
    id: 1,
    sender: "Jan Mayer",
    message: "invited you to interview with Nomad",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+man+with+glasses",
    status: "New",
    time: "12 mins ago",
    read: false,
    type: "interview",
    interviewTitle: "Interview - Jake Gyll",
    interviewRole: "Social Media Manager Role",
    interviewDate: "Mon, 20 July 2021",
    interviewTime: "12 PM - 12:30 PM",
    interviewer: "Jake Gyll",
    interviewerEmail: "jakegyll@email.com",
    interviewerAvatar:
      "/placeholder.svg?height=24&width=24&query=professional+man",
  },
  {
    id: 2,
    sender: "Jana Alicia",
    message: "from Udacity updated your job applications status",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+smiling",
    status: "Shortlisted",
    time: "3 days ago",
    read: false,
    type: "status_update",
  },
  {
    id: 3,
    sender: "Ally Wales",
    message: "from Digital Ocean sent you an interview invitation",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+blonde",
    time: "14 July 2021 • 3:26 PM",
    read: true,
    type: "interview_invite",
  },
]);

const unreadCount = computed(() => {
  return notifications.value.filter((n) => !n.read).length;
});

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

const handleNotification = (notificationId) => {
  const notification = notifications.value.find((n) => n.id === notificationId);
  if (notification) {
    notification.read = true;
    console.log("Notification clicked:", notificationId, notification);
  }
};

const markAllAsRead = () => {
  notifications.value.forEach((notification) => {
    notification.read = true;
  });
  console.log("All notifications marked as read");
};

const getStatusClass = (status) => {
  switch (status.toLowerCase()) {
    case "new":
      return "bg-warning text-dark";
    case "shortlisted":
      return "bg-success";
    default:
      return "bg-secondary";
  }
};

const handleClickOutside = (event) => {
  if (
    notificationButton.value &&
    !notificationButton.value.contains(event.target)
  ) {
    const dropdown = document.querySelector(".notification-dropdown");
    if (dropdown && !dropdown.contains(event.target)) {
      showNotifications.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.notification-dropdown {
  animation: fadeIn 0.2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-item:hover {
  background-color: #f8f9fa !important;
}

.interview-card {
  border-left: 4px solid rgba(255, 255, 255, 0.3);
}
</style>

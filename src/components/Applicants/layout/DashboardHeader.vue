<template>
  <div
    class="dashboard-header container py-2 d-flex align-items-center justify-content-between"
  >
    <div class="d-flex align-items-center">
      <!-- Page title with animation -->
      <transition name="fade" mode="out-in">
        <h1 :key="title" class="page-title mb-0">{{ title }}</h1>
      </transition>
    </div>

    <div class="d-flex align-items-center gap-3">
      <!-- Back to homepage button - Fixed visibility -->
      <router-link
        v-if="showBackButton"
        to="/applicant/dashboard"
        class="back-button"
      >
        <!-- <i class="bi bi-arrow-left me-2"></i> -->
        Back to homepage
      </router-link>

      <!-- Notifications dropdown -->
      <div class="dropdown">
        <button
          class="notification-button position-relative"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="Notifications"
        >
          <div class="notification-icon">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.4829 20.1373C11.0009 20.7143 11.6659 21.0312 12.3559 21.0312H12.3569C13.0499 21.0312 13.7179 20.7142 14.2369 20.1362C14.5149 19.8293 14.9889 19.8042 15.2959 20.0812C15.6039 20.3582 15.6289 20.8333 15.3519 21.1402C14.5439 22.0372 13.4809 22.5312 12.3569 22.5312H12.3549C11.2339 22.5303 10.1729 22.0362 9.36792 21.1392C9.09092 20.8323 9.11592 20.3572 9.42392 20.0812C9.73192 19.8032 10.2059 19.8283 10.4829 20.1373ZM12.4057 1.03125C16.8507 1.03125 19.8367 4.49325 19.8367 7.72625C19.8367 9.38925 20.2597 10.0942 20.7087 10.8422C21.1527 11.5802 21.6557 12.4183 21.6557 14.0022C21.3067 18.0492 17.0817 18.3792 12.4057 18.3792C7.72972 18.3792 3.50372 18.0492 3.1587 14.0662C3.15572 12.4183 3.65872 11.5802 4.10272 10.8422L4.25946 10.5784C4.64539 9.91511 4.97472 9.1936 4.97472 7.72625C4.97472 4.49325 7.96072 1.03125 12.4057 1.03125ZM12.4057 2.53125C8.91072 2.53125 6.47472 5.26925 6.47472 7.72625C6.47472 9.80525 5.89772 10.7663 5.38772 11.6143C4.97872 12.2952 4.65572 12.8333 4.65572 14.0022C4.82272 15.8882 6.06772 16.8792 12.4057 16.8792C18.7087 16.8792 19.9927 15.8442 20.1587 13.9373C20.1557 12.8333 19.8327 12.2952 19.4237 11.6143C18.9137 10.7663 18.3367 9.80525 18.3367 7.72625C18.3367 5.26925 15.9007 2.53125 12.4057 2.53125Z"
                fill="#25324B"
              />
            </svg>
            <span v-if="notificationCount > 0" class="notification-dot"> </span>
          </div>
        </button>
        <Notifications
          v-if="recentNotifications.length"
          class="dropdown-menu notification-dropdown"
          aria-labelledby="notificationDropdown"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Notifications from "@/views/applicants/notifications.vue";
export default {
  name: "DashboardHeader",
  components: {
    Notifications,
  },
  props: {
    title: {
      type: String,
      default: "Dashboard",
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
    notificationCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      recentNotifications: [
        {
          id: 1,
          sender: "Jan Mayer",
          message: "invited you to interview with Nomad",
          time: "12 mins ago",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          badge: "New",
          read: false,
        },
        {
          id: 2,
          sender: "Jana Alicia",
          message: "from Udacity updated your job application status",
          time: "3 days ago",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          badge: "Shortlisted",
          read: false,
        },
        {
          id: 3,
          sender: "Ally Wales",
          message: "from Digital Ocean sent you an interview invitation",
          time: "1 week ago",
          avatar: "https://v0.dev/placeholder.svg?height=40&width=40",
          badge: null,
          read: true,
        },
      ],
    };
  },
  computed: {
    userInitials() {
      if (!this.user.name) return "";
      return this.user.name
        .split(" ")
        .map((n) => n[0])
        .join("");
    },
  },
  methods: {
    goBack() {
      this.$router.push("/applicant/dashboard");
    },
    markAllAsRead() {
      this.recentNotifications.forEach((notification) => {
        notification.read = true;
      });
      this.$emit("notifications-read");
    },
    handleNotificationClick(notification) {
      notification.read = true;
      // Handle navigation based on notification type
      if (notification.badge === "New") {
        this.$router.push("/applicant/interviews");
      } else if (notification.badge === "Shortlisted") {
        this.$router.push("/applicant/my-applications");
      }
    },
    getBadgeClass(badge) {
      switch (badge?.toLowerCase()) {
        case "new":
          return "bg-warning text-dark";
        case "shortlisted":
          return "bg-success";
        case "interview":
          return "bg-primary";
        default:
          return "bg-secondary";
      }
    },
  },
  // Add this to debug the showBackButton prop
  mounted() {
    console.log(
      "DashboardHeader mounted, showBackButton:",
      this.showBackButton
    );
  },
  watch: {
    // Watch for changes to the showBackButton prop
    showBackButton(newVal) {
      console.log("showBackButton changed to:", newVal);
    },
  },
};
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}
.dashboard-header {
  width: 100%;
  height: 70px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 1020;
  border-bottom: 1px solid #e8eaed;
}

.page-title {
  font-size: 28px;
  font-weight: 600;
  color: #202124;
}

.back-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid #e8eaed;
  /* border-radius: 8px; */
  color: #4640de;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.back-button:hover {
  background-color: #f8f9fa;
  border-color: #4640de;
  color: #4640de;
  text-decoration: none;
  transform: translateX(-2px);
}
/* New notification button styling to match the image */
.notification-button {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  position: relative;
  transition: all 0.2s ease;
}

.notification-button:hover {
  background-color: #f0f0ff;
}

.notification-button:focus {
  outline: none;
  box-shadow: none;
}

.notification-icon {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 2px solid #4640de;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.notification-icon svg {
  width: 20px;
  height: 20px;
}

.notification-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background-color: #ff5630;
  border-radius: 50%;
  border: 2px solid #ffffff;
}

.notification-dropdown {
  min-width: 320px;
  max-width: 400px;
  padding: 0;
  border: 1px solid #e8eaed;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

/* Title transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .page-title {
    font-size: 22px;
  }

  .back-button {
    padding: 6px 12px;
    font-size: 13px;
  }

  .notification-dropdown {
    min-width: 280px;
    max-width: 90vw;
  }
}
</style>
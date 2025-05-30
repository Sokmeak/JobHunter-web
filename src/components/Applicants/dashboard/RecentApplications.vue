<template>
  <div class="applications-card">
    <div class="card-header">
      <h2 class="card-title">Recent Applications History</h2>
    </div>

    <div class="card-body">
      <div v-if="applications.length === 0" class="empty-state">
        <i class="bi bi-briefcase display-4 text-muted mb-3"></i>
        <p class="text-muted">No applications yet. Start applying to jobs!</p>
        <button class="btn btn-primary">Find Jobs</button>
      </div>

      <div v-else class="applications-list">
        <div
          v-for="(application, index) in displayedApplications"
          :key="application.id"
          class="application-item"
          :class="{
            'border-bottom':
              applications.indexOf(application) !== applications.length - 1,
            'odd-item': index % 2 !== 0,
            'even-item': index % 2 === 0,
          }"
        >
          <!-- Company Logo -->
          <div class="company-logo">
            <div class="logo-circle">
              <img
                v-if="application.companyLogo"
                :src="application.companyLogo"
                :alt="application.companyName"
                class="logo-img"
              />
              <span v-else class="logo-text">
                {{ getCompanyInitials(application.companyName) }}
              </span>
            </div>
          </div>

          <!-- Job Details -->
          <div class="job-details">
            <h3 class="job-title">{{ application.jobTitle }}</h3>
            <div class="job-meta">
              <span class="company-name">{{ application.companyName }}</span>
              <span class="separator">•</span>
              <span class="location">{{ application.location }}</span>
              <span class="separator">•</span>
              <span class="job-type">{{ application.jobType }}</span>
            </div>
          </div>

          <!-- Date Applied -->
          <div class="date-section">
            <div class="date-label">Date Applied</div>
            <div class="date-value">{{ application.dateApplied }}</div>
          </div>

          <!-- Status Badge -->
          <div class="status-section">
            <StatusBadge :status="application.status" />
          </div>

          <!-- Action Menu -->
          <div class="action-menu">
            <button
              class="menu-button"
              :id="`menuButton${application.id}`"
              @click="toggleMenu(application.id)"
            >
              <i class="bi bi-three-dots"></i>
            </button>

            <div
              v-if="activeMenu === application.id"
              class="dropdown-menu"
              :class="{ show: activeMenu === application.id }"
            >
              <button
                class="dropdown-item danger"
                @click="deleteApplication(application)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- View All Link -->
      <div v-if="applications.length > 0" class="view-all-section">
        <router-link
          to="/applicant/my-applications"
          class="view-all-link"
          @click.native="viewAllApplications"
        >
          View all applications history
          <i class="bi bi-arrow-up-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import StatusBadge from "../applications/StatusBadge.vue";
export default {
  name: "RecentApplications",
  components: {
    StatusBadge,
  },
  props: {
    applications: {
      type: Array,
      default: () => [],
    },
    maxItems: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      activeMenu: null,
    };
  },
  computed: {
    displayedApplications() {
      return this.applications.slice(0, this.maxItems);
    },
  },
  methods: {
    getCompanyInitials(companyName) {
      return companyName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .join("")
        .substring(0, 2);
    },
    toggleMenu(applicationId) {
      this.activeMenu =
        this.activeMenu === applicationId ? null : applicationId;
    },
    viewApplication(application) {
      this.$emit("view-application", application);
      this.activeMenu = null;
    },
    editApplication(application) {
      this.$emit("edit-application", application);
      this.activeMenu = null;
    },
    deleteApplication(application) {
      this.$emit("delete-application", application);
      this.activeMenu = null;
    },
    // viewAllApplications() {
    //   this.$emit("view-all-applications");
    // },
  },
  mounted() {
    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".action-menu")) {
        this.activeMenu = null;
      }
    });
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>


<style scoped>
.applications-card {
  background: white;
  border: 1px solid #d6ddeb;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.card-header {
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #d6ddeb;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.card-body {
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 60px 24px;
}

.empty-state .text-muted {
  color: #6b7280;
  margin-bottom: 20px;
}

.empty-state .btn {
  background-color: #4640de;
  border-color: #4640de;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 500;
}

.applications-list {
  padding: 0;
}

.application-item {
  display: flex;
  margin: 30px;
  align-items: center;
  padding: 20px 20px 20px 24px;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  position: relative;
}

.application-item.even-item {
  background-color: #f8f8fd;
}

/* Odd items (1, 3, 5...) - gray background */
.application-item.odd-item {
  background-color: white;
}

.application-item.border-bottom {
  border-bottom: 1px solid #f3f4f6;
}

.company-logo {
  margin-right: 16px;
  flex-shrink: 0;
}

.logo-circle {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: #f1f3f4;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.logo-text {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.job-details {
  flex: 1;
  min-width: 0;
  margin-right: 16px;
}

.job-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
  line-height: 1.4;
}

.job-meta {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.4;
}

.separator {
  margin: 0 8px;
  color: #d1d5db;
}

.date-section {
  text-align: left;
  margin-right: 24px;
  min-width: 100px;
  flex-shrink: 0;
}

.date-label {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 500;
}

.date-value {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.status-section {
  margin-right: 16px;
  flex-shrink: 0;
}

.action-menu {
  position: relative;
  flex-shrink: 0;
}

.menu-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #9ca3af;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 16px;
}

.menu-button:hover {
  background-color: #f3f4f6;
  color: #6b7280;
}
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 160px;
  z-index: 1000;
  padding: 8px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: all 0.2s ease;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  text-align: left;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.danger {
  color: #dc2626;
}

.dropdown-divider {
  margin: 8px 0;
  border: none;
  border-top: 1px solid #e5e7eb;
}

.view-all-section {
  padding: 20px 24px;
  text-align: center;
  border-top: 1px solid #f3f4f6;
}

.view-all-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4640de;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: #3730a3;
  text-decoration: none;
}

.view-all-link i {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.view-all-link:hover i {
  transform: translate(2px, -2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .application-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 16px;
  }

  .company-logo {
    margin-right: 0;
  }

  .job-details {
    margin-right: 0;
    width: 100%;
  }

  .date-section {
    margin-right: 0;
    min-width: auto;
  }

  .status-section {
    margin-right: 0;
  }

  .action-menu {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .card-header {
    padding: 20px 16px 12px 16px;
  }

  .empty-state {
    padding: 40px 16px;
  }
}
</style>
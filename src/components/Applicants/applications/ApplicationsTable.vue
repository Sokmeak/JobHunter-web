<template>
  <div class="applications-card">
    <div class="card-body">
      <div v-if="applications.length === 0" class="empty-state">
        <i class="bi bi-briefcase display-4 text-muted mb-3"></i>
        <p class="text-muted">No applications found.</p>
        <RouterLink to="/applicant/find-jobs" class="btn btn-primary">
          Find Jobs
        </RouterLink>
      </div>

      <div v-else class="applications-list">
        <div
          v-for="(application, index) in applications"
          :key="application.id"
          class="application-item"
          :class="{
            'border-bottom': index !== applications.length - 1,
            'odd-item': index % 2 !== 0,
            'even-item': index % 2 === 0,
          }"
        >
          <!-- Company Logo -->
          <div class="company-logo">
            <div class="logo-circle">
              <img
                v-if="application.job.CompanyLogo"
                :src="
                  'http://localhost:3000/files/' + application.job.CompanyLogo
                "
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
            <h3 class="job-title">{{ application.job.title }}</h3>
            <div class="job-meta">
              <span class="company-name">{{
                application.job.companyName
              }}</span>
              <span class="separator">•</span>
              <span class="location">{{
                application.job?.location || "N/A"
              }}</span>
              <span class="separator">•</span>
              <span class="job-type">{{
                application.job?.job_type || "N/A"
              }}</span>
            </div>
          </div>

          <!-- Date Applied -->
          <div class="date-section">
            <div class="date-value">
              {{ formatDate(application.createdAt) }}
            </div>
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
                class="dropdown-item"
                @click="viewApplication(application)"
              >
                View
              </button>
              <button
                v-if="canRequestFollowUp(application)"
                class="dropdown-item"
                @click="requestFollowUp(application)"
              >
                Follow Up
              </button>
              <button
                class="dropdown-item"
                @click="withdrawApplication(application)"
              >
                Withdraw
              </button>
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
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { format, parseISO, isAfter, addDays } from "date-fns";
import { RouterLink } from "vue-router";
import StatusBadge from "@/components/Applicants/applications/StatusBadge.vue";

export default {
  name: "ApplicationsTable",
  components: {
    StatusBadge,
    RouterLink,
  },
  props: {
    applications: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const activeMenu = ref(null);

    const getCompanyInitials = (companyName) => {
      if (!companyName) return "N/A";
      const words = companyName.split(" ");
      return words.length > 1
        ? words[0][0] + words[1][0]
        : companyName.slice(0, 2).toUpperCase();
    };

    const getLogoUrl = (logoPath) => {
      if (logoPath.startsWith("http")) return logoPath;
      return `http://localhost:3000/files/${logoPath}`;
    };

    const formatDate = (isoDate) => {
      try {
        return format(parseISO(isoDate), "MMM dd, yyyy");
      } catch {
        return "Invalid Date";
      }
    };

    const toggleMenu = (applicationId) => {
      activeMenu.value =
        activeMenu.value === applicationId ? null : applicationId;
    };

    const viewApplication = (application) => {
      activeMenu.value = null;
      return application;
    };

    const canRequestFollowUp = (application) => {
      if (!application || application.status !== "In Review") return false;
      const appliedDate = parseISO(application.dateApplied);
      const sevenDaysAfter = addDays(appliedDate, 7);
      return (
        isAfter(new Date(), sevenDaysAfter) && !application.followUpRequested
      );
    };

    const requestFollowUp = (application) => {
      activeMenu.value = null;
      return application;
    };

    const withdrawApplication = (application) => {
      activeMenu.value = null;
      return application;
    };

    const deleteApplication = (application) => {
      activeMenu.value = null;
      return application;
    };

    return {
      activeMenu,
      getCompanyInitials,
      getLogoUrl,
      formatDate,
      toggleMenu,
      viewApplication,
      canRequestFollowUp,
      requestFollowUp,
      withdrawApplication,
      deleteApplication,
    };
  },
};
</script>

<style scoped>
.applications-card {
  background: white;
  border: 1px solid #d6ddeb;
  border-radius: 12px;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
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
  align-items: center;
  padding: 20px 24px;
  transition: background-color 0.2s ease;
  border-radius: 8px;
  position: relative;
}

.application-item.even-item {
  background-color: #f8f8fd;
}

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

  .empty-state {
    padding: 40px 16px;
  }
}
</style>

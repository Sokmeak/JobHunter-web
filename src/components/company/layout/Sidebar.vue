<template>
  <aside class="sidebar bg-white shadow-sm" :class="{ collapsed: isCollapsed }">
    <!-- Logo -->
    <div class="sidebar-header p-4 border-bottom">
      <div class="d-flex align-items-center">
        <!-- <div
          class="logo-icon bg-primary text-white rounded-3 me-3"
          v-if="!isCollapsed"
        ></div> -->
        <div v-if="isCollapsed">
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_559_28516)">
              <circle
                cx="16.7529"
                cy="16.7109"
                r="16"
                transform="rotate(-0.431599 16.7529 16.7109)"
                fill="#4640DE"
              />
              <mask id="path-2-inside-1_559_28516" fill="white">
                <path
                  d="M16.836 27.7106C19.5011 27.6905 22.1504 25.5658 23.8677 23.8365C24.2639 23.4376 23.7789 22.8703 23.2839 23.1368C21.4106 24.1451 18.8359 25.2955 16.8179 25.3107C14.7999 25.3259 12.2082 24.2144 10.3198 23.2344C9.82085 22.9755 9.34453 23.55 9.74664 23.9429C11.4898 25.6461 14.1708 27.7307 16.836 27.7106Z"
                />
              </mask>
              <path
                d="M23.8677 23.8365L25.9964 25.9505L25.9964 25.9505L23.8677 23.8365ZM9.74664 23.9429L7.65006 26.0887L7.65006 26.0887L9.74664 23.9429ZM10.3198 23.2344L11.7017 20.5716L11.7017 20.5716L10.3198 23.2344ZM23.2839 23.1368L21.8621 20.4951L21.8621 20.4951L23.2839 23.1368ZM21.739 21.7226C20.975 22.4919 20.0679 23.2815 19.1271 23.8644C18.1607 24.4632 17.3805 24.7064 16.8134 24.7107L16.8586 30.7105C18.9565 30.6947 20.8336 29.8655 22.2874 28.9646C23.7669 28.0479 25.0431 26.9104 25.9964 25.9505L21.739 21.7226ZM16.8134 24.7107C16.2462 24.715 15.4625 24.4836 14.4871 23.8993C13.5377 23.3306 12.6187 22.5549 11.8432 21.7971L7.65006 26.0887C8.61771 27.0341 9.91085 28.1522 11.404 29.0466C12.8712 29.9255 14.7606 30.7263 16.8586 30.7105L16.8134 24.7107ZM8.938 25.8972C9.95749 26.4263 11.2133 27.0158 12.5274 27.4767C13.8044 27.9245 15.3326 28.3219 16.8405 28.3106L16.7953 22.3108C16.2852 22.3146 15.5085 22.1639 14.513 21.8148C13.5548 21.4787 12.5705 21.0225 11.7017 20.5716L8.938 25.8972ZM16.8405 28.3106C18.3484 28.2992 19.8704 27.8788 21.1405 27.4118C22.4475 26.9312 23.6943 26.3228 24.7057 25.7785L21.8621 20.4951C21.0002 20.959 20.0229 21.43 19.0698 21.7804C18.0797 22.1445 17.3054 22.3069 16.7953 22.3108L16.8405 28.3106ZM25.9964 25.9505C26.5859 25.3568 26.9899 24.5335 27.0124 23.5931C27.034 22.6887 26.6973 21.8887 26.2031 21.3028C25.1903 20.1021 23.4077 19.6632 21.8621 20.4951L24.7057 25.7785C23.6552 26.3439 22.3625 26.0554 21.6169 25.1715C21.2562 24.7439 20.9975 24.1439 21.0141 23.4498C21.0315 22.7196 21.3476 22.1168 21.739 21.7226L25.9964 25.9505ZM11.8432 21.7971C12.2406 22.1854 12.5657 22.7833 12.5941 23.5132C12.6212 24.207 12.3715 24.8109 12.0173 25.2438C11.2851 26.1389 9.99692 26.4468 8.938 25.8972L11.7017 20.5716C10.1438 19.7632 8.36796 20.2288 7.37332 21.4447C6.88798 22.0379 6.56343 22.8429 6.59867 23.7469C6.6353 24.6869 7.05164 25.504 7.65006 26.0887L11.8432 21.7971Z"
                fill="white"
                mask="url(#path-2-inside-1_559_28516)"
              />
              <path
                d="M22.4136 9.98406C22.0913 9.66437 22.0874 9.14806 22.4049 8.82355L24.1072 6.68178L24.1069 6.64482C24.539 6.21085 25.2448 6.20554 25.6834 6.63295C26.122 7.06036 26.1272 7.75864 25.6951 8.19261L23.6837 9.97449L23.6086 10.0421C23.4515 10.1682 23.2549 10.2386 23.0506 10.2402C22.8123 10.242 22.5831 10.1498 22.4136 9.98406ZM9.41295 15.9514C9.39867 14.0557 10.1462 12.2318 11.491 10.8812C12.8358 9.53048 14.6677 8.76356 16.5838 8.74913C20.574 8.71907 23.8327 11.8949 23.8624 15.8425C23.8922 19.7902 20.6816 23.0147 16.6915 23.0448C12.7014 23.0748 9.44269 19.899 9.41295 15.9514Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_559_28516">
                <rect
                  width="32"
                  height="32"
                  fill="white"
                  transform="translate(0.632812 0.831879) rotate(-0.431599)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <PrimaryLogo v-else class="ms-2" :context="'/company'" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav p-3">
      <ul class="nav flex-column">
        <!-- Dashboard -->
        <li class="nav-item mb-1">
          <router-link
            to="/company/dashboard"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'Dashboard' }"
          >
            <i class="bi bi-speedometer2 nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Dashboard</span>
          </router-link>
        </li>

        <!-- Jobs Section -->
        <li class="nav-item mb-1">
          <div class="nav-section-title" v-if="!isCollapsed">
            <small class="text-muted fw-medium">JOBS</small>
          </div>
        </li>

        <li class="nav-item mb-1">
          <router-link
            to="/company/job-listing"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'JobListing' }"
          >
            <i class="bi bi-briefcase nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Job Listings</span>
          </router-link>
        </li>

        <li class="nav-item mb-1">
          <router-link
            to="/company/post-job"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'PostJob' }"
          >
            <i class="bi bi-plus-circle nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Post New Job</span>
          </router-link>
        </li>

        <!-- Applicants Section -->
        <li class="nav-item mb-1">
          <div class="nav-section-title" v-if="!isCollapsed">
            <small class="text-muted fw-medium">APPLICANTS</small>
          </div>
        </li>

        <li class="nav-item mb-1">
          <router-link
            to="/company/all-applicants"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'AllApplicants' }"
          >
            <i class="bi bi-people nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">All Applicants</span>
            <span v-if="!isCollapsed" class="badge bg-primary ms-auto">24</span>
          </router-link>
        </li>

        <!-- Schedule -->
        <li class="nav-item mb-1">
          <router-link
            to="/company/schedule"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'MySchedule' }"
          >
            <i class="bi bi-calendar-check nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">My Schedule</span>
          </router-link>
        </li>

        <!-- Analytics -->
        <li class="nav-item mb-1">
          <div class="nav-section-title" v-if="!isCollapsed">
            <small class="text-muted fw-medium">ANALYTICS</small>
          </div>
        </li>

        <li class="nav-item mb-1">
          <a href="#" class="nav-link d-flex align-items-center">
            <i class="bi bi-graph-up nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Reports</span>
          </a>
        </li>

        <li class="nav-item mb-1">
          <a href="#" class="nav-link d-flex align-items-center">
            <i class="bi bi-bar-chart nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Analytics</span>
          </a>
        </li>

        <!-- Settings Section -->
        <li class="nav-item mb-1">
          <div class="nav-section-title" v-if="!isCollapsed">
            <small class="text-muted fw-medium">SETTINGS</small>
          </div>
        </li>

        <li class="nav-item mb-1">
          <router-link
            :to="{ name: 'Company-Settings' }"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'Settings' }"
          >
            <i class="bi bi-gear nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Settings</span>
          </router-link>
        </li>

        <li class="nav-item mb-1">
          <router-link
            to="/company/help"
            class="nav-link d-flex align-items-center"
            :class="{ active: $route.name === 'HelpCenter' }"
          >
            <i class="bi bi-question-circle nav-icon"></i>
            <span v-if="!isCollapsed" class="nav-text">Help Center</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Sidebar Footer -->
    <div class="sidebar-footer p-3 border-top mt-auto" v-if="!isCollapsed">
      <div class="d-flex align-items-center">
        <img
          :src="placeholder"
          alt="User"
          class="rounded-circle me-3"
          style="width: 40px; height: 40px"
        />
        <div class="flex-grow-1">
          <div class="fw-medium">John Doe</div>
          <small class="text-muted">HR Manager</small>
        </div>
        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-three-dots"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" href="#">Sign Out</a></li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import placeholder from "@/assets/images/placeholder.svg";
import PrimaryLogo from "@/components/sharecomponents/PrimaryLogo.vue";

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["toggle"]);
</script>

<style scoped>
/* (No changes needed in styles) */
.sidebar {
  width: 280px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: width 0.3s ease;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}
.sidebar.collapsed {
  width: 80px;
}
.logo-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sidebar.collapsed .logo-icon {
  width: 40px;
  height: 40px;
}
.nav-link {
  padding: 12px 16px;
  border-radius: 8px;
  color: #64748b;
  text-decoration: none;
  transition: all 0.2s ease;
  margin-bottom: 4px;
}
.nav-link:hover {
  background-color: #f1f5f9;
  color: #6366f1;
}
.nav-link.active {
  background-color: #6366f1;
  color: white;
}
.nav-icon {
  width: 20px;
  font-size: 1.1rem;
  margin-right: 12px;
}
.sidebar.collapsed .nav-icon {
  margin-right: 0;
}
.nav-text {
  font-weight: 500;
}
.nav-section-title {
  padding: 16px 16px 8px;
}
.sidebar.collapsed .nav-section-title {
  display: none;
}
.sidebar-footer {
  margin-top: auto;
}
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.show {
    transform: translateX(0);
  }
}
</style>

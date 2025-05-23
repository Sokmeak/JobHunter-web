<template>
  <div>
    <div 
      class="sidebar" 
      :class="{ 
        'show': isMobileMenuOpen,
        'collapsed': isCollapsed && !isMobileMenuOpen
      }"
    >
      <div class="sidebar-header">
        <div v-if="!isCollapsed || isMobileMenuOpen" class="logo-full">
          <PrimaryLogo />
        </div>
        <div v-else class="logo-icon">
          <img src="@/assets/images/jobhuntericon.svg" alt="JobHunter Icon" class="logo-mini" />
        </div>
        
        <!-- Collapse toggle button (desktop only) -->
        <button 
          v-if="!isMobileMenuOpen"
          class="btn btn-sm btn-light ms-auto d-none d-lg-flex align-items-center justify-content-center collapse-btn"
          @click="toggleCollapse"
          aria-label="Toggle sidebar collapse"
        >
          <i :class="['bi', isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left']"></i>
        </button>
      </div>
      
      <div class="nav-items">
        <router-link 
          v-for="item in navigation" 
          :key="item.name"
          :to="item.href" 
          class="nav-item" 
          active-class="active" 
          @click="handleNavigation"
          :title="isCollapsed && !isMobileMenuOpen ? item.name : ''"
        >
          <i :class="['bi', `bi-${item.icon}`, 'nav-icon']"></i>
          <span v-if="!isCollapsed || isMobileMenuOpen" class="nav-text">{{ item.name }}</span>
          <span 
            v-if="item.badge && (!isCollapsed || isMobileMenuOpen)" 
            class="badge rounded-pill bg-primary ms-auto nav-badge"
          >
            {{ item.badge }}
          </span>
          <span 
            v-else-if="item.badge && isCollapsed && !isMobileMenuOpen" 
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary badge-collapsed"
          >
            {{ item.badge }}
          </span>
        </router-link>
      </div>
      
      <div class="settings-section">
        <div class="settings-header" v-if="!isCollapsed || isMobileMenuOpen">SETTINGS</div>
        
        <router-link 
          v-for="item in bottomNavigation" 
          :key="item.name"
          :to="item.href" 
          class="nav-item" 
          active-class="active" 
          @click="handleNavigation"
          :title="isCollapsed && !isMobileMenuOpen ? item.name : ''"
        >
          <i :class="['bi', `bi-${item.icon}`, 'nav-icon']"></i>
          <span v-if="!isCollapsed || isMobileMenuOpen" class="nav-text">{{ item.name }}</span>
        </router-link>
      </div>
      
      <div class="user-profile">
        <!-- User dropdown -->
        <div class="dropup w-100">
          <button 
            class="btn btn-user w-100 d-flex align-items-center gap-2 p-3"
            :class="{ 'justify-content-center': isCollapsed && !isMobileMenuOpen }"
            data-bs-toggle="dropdown" 
            aria-expanded="false"
          >
            <div class="position-relative">
              <img 
                v-if="user.avatar" 
                :src="user.avatar" 
                :alt="user.name" 
                class="rounded-circle user-avatar" 
              >
              <span v-else class="user-initials">{{ userInitials }}</span>
              <span class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white status-indicator"></span>
            </div>
            <div v-if="!isCollapsed || isMobileMenuOpen" class="text-start flex-grow-1 overflow-hidden">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-email">{{ user.email }}</div>
            </div>
            <i v-if="!isCollapsed || isMobileMenuOpen" class="bi bi-chevron-up text-muted"></i>
          </button>
          
          <ul class="dropdown-menu w-100 user-dropdown">
            <li class="dropdown-header">
              <div class="d-flex flex-column">
                <span class="fw-medium">{{ user.name }}</span>
                <span class="small text-muted">{{ user.email }}</span>
              </div>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><router-link class="dropdown-item" to="/applicant/profile"><i class="bi bi-person me-2"></i> My Profile</router-link></li>
            <li><router-link class="dropdown-item" to="/applicant/settings"><i class="bi bi-gear me-2"></i> Settings</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" @click.prevent="logout"><i class="bi bi-box-arrow-right me-2"></i> Log out</a></li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Backdrop for mobile -->
    <div 
      v-if="isMobileMenuOpen" 
      class="sidebar-backdrop"
      @click="closeMobileMenu"
    ></div>
  </div>
</template>

<script>
import PrimaryLogo from '@/components/sharecomponents/PrimaryLogo.vue';

export default {
  name: "SidebarNavigation",
  components: {
    PrimaryLogo
  },
  props: {
    user: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        email: '',
        avatar: ''
      })
    },
    isMobileMenuOpen: {
      type: Boolean,
      default: false
    },
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userInitials() {
      if (!this.user.name) return '';
      return this.user.name
        .split(' ')
        .map(n => n[0])
        .join('');
    }
  },
  emits: ['close-mobile-menu', 'toggle-collapse'],
  data() {
    return {
      navigation: [
        { name: 'Dashboard', href: '/applicant/dashboard', icon: 'house' },
        { name: 'Messages', href: '/applicant/messages', icon: 'chat', badge: '1' },
        { name: 'My Applications', href: '/applicant/my-applications', icon: 'file-earmark-text' },
        { name: 'Find Jobs', href: '/applicant/find-jobs', icon: 'search' },
        { name: 'Browse Companies', href: '/applicant/BrowseCompany', icon: 'building' },
        { name: 'My Public Profile', href: '/applicant/profile', icon: 'person' },
      ],
      bottomNavigation: [
        { name: 'Settings', href: '/applicant/settings', icon: 'gear' },
        { name: 'Help Center', href: '/applicant/help', icon: 'question-circle' },
      ]
    };
  },
  methods: {
    handleNavigation() {
      if (window.innerWidth < 992) {
        this.closeMobileMenu();
      }
    },
    closeMobileMenu() {
      this.$emit('close-mobile-menu');
    },
    toggleCollapse() {
      this.$emit('toggle-collapse');
    },
    logout() {
      console.log('Logging out...');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: #F8F8FD;
  border-right: 1px solid #e8eaed;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease-in-out;
  z-index: 1040;
  overflow-y: auto;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar-header {
  display: flex;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid #e8eaed;
  min-height: 70px;
  background-color: #F8F8FD;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.logo-mini {
  width: 32px;
  height: 32px;
}

.collapse-btn {
  width: 28px;
  height: 28px;
  border: 1px solid #e8eaed;
  background-color: #ffffff;
  color: #6c757d;
}

.collapse-btn:hover {
  background-color: #f8f9fa;
  border-color: #d0d7de;
}

/* Mobile responsiveness */
@media (max-width: 991.98px) {
  .sidebar {
    transform: translateX(-100%);
    width: 220px !important;
  }
  
  .sidebar.show {
    transform: translateX(0);
  }
}

.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1039;
  display: none;
}

@media (max-width: 991.98px) {
  .sidebar-backdrop {
    display: block;
  }
}

.nav-items {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  color: #6c757d;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  margin: 2px 8px;

  font-size: 15px;
  font-weight: 400;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 12px 8px;
}

.nav-item:hover {
  background-color: #e8eaed;
  color: #4640DE;
  text-decoration: none;
}

.nav-item.active {
  background-color: #f0f0ff;
  color: #5138ee;
  border-left: 3px solid #5138ee;
}

.nav-item.active .nav-icon {
  color: #4640DE;
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  text-align: center;
  color: #6c757d;
}

.nav-text {
  margin-left: 12px;
  font-size: 15px;
}

.nav-badge {
 color: #4640DE;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-collapsed {
  font-size: 10px;
  z-index: 10;
 color: #4640DE;
}

.settings-section {
  border-top: 1px solid #e8eaed;
  padding: 16px 0 8px;
  margin-top: auto;
}

.settings-header {
  padding: 0 16px 12px;
  font-size: 11px;
  color: #9aa0a6;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.user-profile {
  border-top: 1px solid #e8eaed;
  padding: 12px;
  background-color: #F8F8FD;
}

.btn-user {
  background-color: transparent;
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s ease;
}

.btn-user:hover {
  background-color: #F8F8FD;
}

.user-avatar {
  width: 32px;
  height: 32px;
  object-fit: cover;
}

.user-initials {
  width: 32px;
  height: 32px;
  color: #4640DE;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.status-indicator {
  width: 8px;
  height: 8px;
}

.user-name {
  font-weight: 500;
  font-size: 14px;
  color: #202124;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.user-email {
  font-size: 12px;
  color: #5f6368;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.user-dropdown {
  border: 1px solid #F8F8FD;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.user-dropdown .dropdown-item:hover {
  background-color: #F8F8FD;
}

.user-dropdown .dropdown-item.text-danger:hover {
  background-color: #F8F8FD;
  color: #dc2626;
}
</style>
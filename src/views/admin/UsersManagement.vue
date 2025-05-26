<template>
  <div class="users-management">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Users Management</h1>
        <p class="page-subtitle">
          Manage user accounts, verify users and handle suspensions.
        </p>
      </div>
    </div>

    <div class="users-controls">
      <div class="search-section">
        <div class="search-box">
          <Search class="search-icon" />
          <input
            type="text"
            placeholder="This is placeholder"
            v-model="searchQuery"
            class="search-input"
          />
        </div>
      </div>

      <div class="controls-right">
        <div class="status-filter">
          <select v-model="statusFilter" class="status-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
          <ChevronDown class="select-icon" />
        </div>

        <button class="add-user-button" @click="showAddUserModal = true">
          <Plus class="button-icon" />
          <span>Add User</span>
        </button>
      </div>
    </div>

    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th class="user-column">User</th>
            <th class="role-column">Role</th>
            <th class="status-column">Status</th>
            <th class="verified-column">Verified</th>
            <th class="date-column">Join Date</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="user-row">
            <td class="user-cell">
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
            </td>
            <td class="role-cell">
              <span class="role-badge" :class="getRoleClass(user.role)">
                {{ user.role }}
              </span>
            </td>
            <td class="status-cell">
              <span class="status-badge" :class="getStatusClass(user.status)">
                {{ user.status }}
              </span>
            </td>
            <td class="verified-cell">
              <div class="verified-status" :class="{ verified: user.verified }">
                <component
                  :is="user.verified ? CheckCircle : XCircle"
                  class="verified-icon"
                />
                <span>{{ user.verified ? "Yes" : "No" }}</span>
              </div>
            </td>
            <td class="date-cell">
              {{ user.joinDate }}
            </td>
            <td class="actions-cell">
              <div class="actions-dropdown" @click="toggleActionsMenu(user.id)">
                <MoreHorizontal class="actions-icon" />
                <div v-if="activeActionsMenu === user.id" class="actions-menu">
                  <button @click="viewUser(user.id)" class="action-item">
                    <Eye class="action-icon" />
                    <span>View Details</span>
                  </button>
                  <button @click="editUser(user.id)" class="action-item">
                    <Edit class="action-icon" />
                    <span>Edit User</span>
                  </button>
                  <button
                    @click="toggleVerification(user.id)"
                    class="action-item"
                  >
                    <component
                      :is="user.verified ? XCircle : CheckCircle"
                      class="action-icon"
                    />
                    <span>{{ user.verified ? "Unverify" : "Verify" }}</span>
                  </button>
                  <button
                    @click="suspendUser(user.id)"
                    class="action-item danger"
                  >
                    <Ban class="action-icon" />
                    <span>Suspend</span>
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="action-item danger"
                  >
                    <Trash2 class="action-icon" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalUsers }} users
      </div>
      <div class="pagination-controls">
        <button
          class="pagination-button"
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          <ChevronLeft class="pagination-icon" />
        </button>
        <span class="page-info"
          >Page {{ currentPage }} of {{ totalPages }}</span
        >
        <button
          class="pagination-button"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          <ChevronRight class="pagination-icon" />
        </button>
      </div>
    </div>

    <!-- Add User Modal -->
    <AddUserModal
      v-if="showAddUserModal"
      @close="showAddUserModal = false"
      @user-added="handleUserAdded"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import {
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import AddUserModal from "@/components/Admin/Users/AddUserModal.vue";

const router = useRouter();

// Reactive data
const searchQuery = ref("");
const statusFilter = ref("");
const currentPage = ref(1);
const itemsPerPage = 15;
const activeActionsMenu = ref(null);
const showAddUserModal = ref(false);

// Mock users data
const users = ref([
  {
    id: 1,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 2,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 3,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 4,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 5,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 6,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 7,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 8,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 9,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Job Seekers",
    status: "Active",
    verified: true,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 10,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 11,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 12,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 13,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 14,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 15,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 16,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 17,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
  {
    id: 18,
    name: "Jonh Doe",
    email: "jonhdoe@gmail.com",
    role: "Employer",
    status: "Active",
    verified: false,
    joinDate: "Jan 15, 2023",
  },
]);

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !statusFilter.value ||
      user.status.toLowerCase() === statusFilter.value.toLowerCase();

    return matchesSearch && matchesStatus;
  });
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

const totalUsers = computed(() => filteredUsers.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, totalUsers.value)
);

// Methods
const getRoleClass = (role) => {
  return {
    "role-job-seekers": role === "Job Seekers",
    "role-employer": role === "Employer",
    "role-admin": role === "Admin",
  };
};

const getStatusClass = (status) => {
  return {
    "status-active": status === "Active",
    "status-inactive": status === "Inactive",
    "status-pending": status === "Pending",
    "status-suspended": status === "Suspended",
  };
};

const toggleActionsMenu = (userId) => {
  activeActionsMenu.value = activeActionsMenu.value === userId ? null : userId;
};

const viewUser = (userId) => {
  router.push(`/users/${userId}`);
  activeActionsMenu.value = null;
};

const editUser = (userId) => {
  router.push(`/users/${userId}/edit`);
  activeActionsMenu.value = null;
};

const toggleVerification = (userId) => {
  const user = users.value.find((u) => u.id === userId);
  if (user) {
    user.verified = !user.verified;
  }
  activeActionsMenu.value = null;
};

const suspendUser = (userId) => {
  const user = users.value.find((u) => u.id === userId);
  if (user) {
    user.status = user.status === "Suspended" ? "Active" : "Suspended";
  }
  activeActionsMenu.value = null;
};

const deleteUser = (userId) => {
  if (confirm("Are you sure you want to delete this user?")) {
    const index = users.value.findIndex((u) => u.id === userId);
    if (index > -1) {
      users.value.splice(index, 1);
    }
  }
  activeActionsMenu.value = null;
};

const handleUserAdded = (newUser) => {
  users.value.unshift({
    ...newUser,
    id: Date.now(),
    joinDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  });
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".actions-dropdown")) {
    activeActionsMenu.value = null;
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
.users-management {
  padding: 1rem 1rem;
}

.page-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.page-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.users-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
  flex-wrap: wrap;
}

.search-section {
  flex: 1;
  min-width: 300px;
}

.search-box {
  position: relative;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #9ca3af;
}

.search-input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
}

.search-input::placeholder {
  color: #9ca3af;
}

.controls-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.status-filter {
  position: relative;
}

.status-select {
  appearance: none;
  padding: 10px 40px 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  min-width: 120px;
}

.select-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: #6b7280;
  pointer-events: none;
}

.add-user-button {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-user-button:hover {
  background-color: #4338ca;
}

.button-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.users-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow-x: auto;
  margin-bottom: 20px;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  text-align: left;
  padding: 16px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  background-color: #f9fafb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.users-table td {
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #f3f4f6;
}

.user-row:hover {
  background-color: #f9fafb;
}

.user-row:last-child td {
  border-bottom: none;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 500;
  color: #111827;
}

.user-email {
  font-size: 12px;
  color: #6b7280;
}

.role-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.role-job-seekers {
  background-color: #ecfdf5;
  color: #10b981;
}

.role-employer {
  background-color: #f3e8ff;
  color: #9333ea;
}

.role-admin {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
}

.status-active {
  background-color: #dbeafe;
  color: #2563eb;
}

.status-inactive {
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-pending {
  background-color: #fffbeb;
  color: #f59e0b;
}

.status-suspended {
  background-color: #fee2e2;
  color: #ef4444;
}

.verified-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
}

.verified-status.verified {
  color: #10b981;
}

.verified-status:not(.verified) {
  color: #ef4444;
}

.verified-icon {
  width: 16px;
  height: 16px;
}

.actions-dropdown {
  position: relative;
  cursor: pointer;
}

.actions-icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.actions-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  min-width: 160px;
  padding: 4px 0;
}

.action-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  color: #374151;
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-item:hover {
  background-color: #f3f4f6;
}

.action-item.danger {
  color: #ef4444;
}

.action-item.danger:hover {
  background-color: #fee2e2;
}

.action-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.pagination-info {
  font-size: 14px;
  color: #6b7280;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pagination-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  background-color: white;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
  background-color: #f3f4f6;
  color: #111827;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-icon {
  width: 16px;
  height: 16px;
}

.page-info {
  font-size: 14px;
  color: #6b7280;
}

@media (max-width: 768px) {
  .users-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls-right {
    justify-content: space-between;
  }

  .pagination {
    flex-direction: column;
    text-align: center;
  }
}
</style>

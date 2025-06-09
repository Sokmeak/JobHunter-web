<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">Users</h1>
      <div class="header-actions">
        <button class="action-button">
          <Plus class="button-icon" />
          <span>Add User</span>
        </button>
      </div>
    </div>

    <div class="users-filters">
      <div class="search-box">
        <Search class="search-icon" />
        <input type="text" placeholder="Search users..." v-model="searchQuery" />
      </div>

      <div class="filter-controls">
        <select v-model="roleFilter" class="filter-select">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="employer">Employer</option>
          <option value="jobseeker">Job Seeker</option>
        </select>

        <select v-model="statusFilter" class="filter-select">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>
    </div>

    <div class="users-table-container">
      <table class="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="user-cell">
              <div class="user-avatar">
                <img :src="user.avatar" :alt="user.name" />
              </div>
              <div class="user-info">
                <div class="user-name">{{ user.name }}</div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <span class="role-badge" :class="`role-${user.role}`">
                {{ user.role }}
              </span>
            </td>
            <td>
              <span class="status-badge" :class="`status-${user.status}`">
                {{ user.status }}
              </span>
            </td>
            <td>{{ user.joinedDate }}</td>
            <td>
              <div class="table-actions">
                <router-link :to="`/users/${user.id}`" class="action-icon-button">
                  <Eye class="action-icon" />
                </router-link>
                <button class="action-icon-button">
                  <Edit class="action-icon" />
                </button>
                <button class="action-icon-button delete">
                  <Trash2 class="action-icon" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <button class="pagination-button" :disabled="currentPage === 1" @click="currentPage--">
        <ChevronLeft class="pagination-icon" />
      </button>
      <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="pagination-button" :disabled="currentPage === totalPages" @click="currentPage++">
        <ChevronRight class="pagination-icon" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Plus, Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useUsersStore } from '@/stores/AdminStore/users';

const userStore = useUsersStore()

const {
  searchQuery,
  roleFilter,
  statusFilter,
  currentPage,
  totalPages,
  paginatedUsers
} = userStore

</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.action-button:hover {
  background-color: #4338ca;
}

.button-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.users-filters {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 200px;
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

.search-box input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.filter-controls {
  display: flex;
  gap: 12px;
}

.filter-select {
  padding: 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
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
  padding: 12px 16px;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.users-table td {
  padding: 16px;
  font-size: 14px;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}

.users-table tr:last-child td {
  border-bottom: none;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-weight: 500;
  color: #111827;
}

.role-badge,
.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.role-admin {
  background-color: #e0e7ff;
  color: #4f46e5;
}

.role-employer {
  background-color: #e0f2fe;
  color: #0284c7;
}

.role-jobseeker {
  background-color: #f3e8ff;
  color: #9333ea;
}

.status-active {
  background-color: #ecfdf5;
  color: #10b981;
}

.status-inactive {
  background-color: #f3f4f6;
  color: #6b7280;
}

.status-pending {
  background-color: #fffbeb;
  color: #f59e0b;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.action-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: none;
  background-color: #f9fafb;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s;
}

.action-icon-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.action-icon-button.delete:hover {
  background-color: #fee2e2;
  color: #ef4444;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
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

.pagination-info {
  font-size: 14px;
  color: #6b7280;
}
</style>
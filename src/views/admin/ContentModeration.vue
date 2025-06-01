<template>
  <div class="content-moderation">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Content Moderation</h1>
        <p class="page-subtitle">
          Review job postings and handle reported content
        </p>
      </div>
    </div>

    <div class="content-controls">
      <div class="search-section">
        <div class="search-box">
          <Search class="search-icon" />
          <input
            type="text"
            placeholder="Search Content"
            v-model="searchQuery"
            class="search-input"
          />
        </div>
      </div>

      <div class="filter-controls">
        <button class="filter-button" @click="showFilters = !showFilters">
          <Filter class="filter-icon" />
          <span>Filters</span>
        </button>

        <div class="status-filter">
          <select v-model="statusFilter" class="status-select">
            <option value="">All Statuses</option>
            <option value="reported">Reported</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          <ChevronDown class="select-icon" />
        </div>

        <div class="type-filter">
          <select v-model="typeFilter" class="type-select">
            <option value="">All Types</option>
            <option value="job">Job</option>
            <option value="profile">Profile</option>
            <option value="comment">Comment</option>
            <option value="review">Review</option>
          </select>
          <ChevronDown class="select-icon" />
        </div>
      </div>
    </div>

    <!-- Advanced Filters Panel -->
    <div v-if="showFilters" class="advanced-filters">
      <div class="filter-row">
        <div class="filter-group">
          <label class="filter-label">Date Range</label>
          <input type="date" v-model="dateFrom" class="filter-input" />
          <span class="filter-separator">to</span>
          <input type="date" v-model="dateTo" class="filter-input" />
        </div>

        <div class="filter-group">
          <label class="filter-label">Reports Count</label>
          <select v-model="reportsFilter" class="filter-select">
            <option value="">Any</option>
            <option value="none">No Reports</option>
            <option value="low">1-2 Reports</option>
            <option value="medium">3-5 Reports</option>
            <option value="high">5+ Reports</option>
          </select>
        </div>

        <button class="apply-filters-button" @click="applyFilters">
          Apply Filters
        </button>

        <button class="clear-filters-button" @click="clearFilters">
          Clear All
        </button>
      </div>
    </div>

    <div class="content-table-container">
      <table class="content-table">
        <thead>
          <tr>
            <th class="content-column">Content</th>
            <th class="type-column">Type</th>
            <th class="status-column">Status</th>
            <th class="reports-column">Reports</th>
            <th class="date-column">Date</th>
            <th class="actions-column">Actions</th>
          </tr>
        </thead>
        <tbody>
          <ContentModerationRow
            v-for="content in paginatedContent"
            :key="content.id"
            :content="content"
            @action="handleContentAction"
          />
        </tbody>
      </table>
    </div>

    <div class="pagination">
      <div class="pagination-info">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of
        {{ totalContent }} items
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

    <!-- Content Action Modal -->
    <ContentActionModal
      v-if="showActionModal"
      :content="selectedContent"
      :action="selectedAction"
      @close="showActionModal = false"
      @confirm="confirmAction"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";
import ContentModerationRow from "@/components/Admin/Content/ContentModerationRow.vue";
import ContentActionModal from "@/components/Admin/Content/ContentActionModal.vue";

// Reactive data
const searchQuery = ref("");
const statusFilter = ref("");
const typeFilter = ref("");
const reportsFilter = ref("");
const dateFrom = ref("");
const dateTo = ref("");
const showFilters = ref(false);
const currentPage = ref(1);
const itemsPerPage = 15;
const showActionModal = ref(false);
const selectedContent = ref(null);
const selectedAction = ref("");

// Mock content data
const contentItems = ref([
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    type: "Job",
    status: "Reported",
    reports: 3,
    date: "Jan 15, 2023",
    description: "Looking for an experienced software engineer...",
  },
  {
    id: 2,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    type: "Job",
    status: "Reported",
    reports: 3,
    date: "Jan 15, 2023",
    description: "Looking for an experienced software engineer...",
  },
  {
    id: 3,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    type: "Job",
    status: "Reported",
    reports: 3,
    date: "Jan 15, 2023",
    description: "Looking for an experienced software engineer...",
  },
  {
    id: 4,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    type: "Job",
    status: "Pending",
    reports: 0,
    date: "Jan 15, 2023",
    description: "Looking for an experienced software engineer...",
  },
]);

// Generate more content items
for (let i = 5; i <= 50; i++) {
  contentItems.value.push({
    id: i,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    type: "Job",
    status: i <= 10 ? "Reported" : i <= 15 ? "Pending" : "Approved",
    reports: i <= 10 ? Math.floor(Math.random() * 5) + 1 : 0,
    date: "Jan 15, 2023",
    description: "Looking for an experienced software engineer...",
  });
}

// Computed properties
const filteredContent = computed(() => {
  return contentItems.value.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesStatus =
      !statusFilter.value ||
      item.status.toLowerCase() === statusFilter.value.toLowerCase();
    const matchesType =
      !typeFilter.value ||
      item.type.toLowerCase() === typeFilter.value.toLowerCase();
    const matchesReports =
      !reportsFilter.value || checkReportsFilter(item.reports);

    return matchesSearch && matchesStatus && matchesType && matchesReports;
  });
});

const paginatedContent = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredContent.value.slice(start, end);
});

const totalContent = computed(() => filteredContent.value.length);
const totalPages = computed(() => Math.ceil(totalContent.value / itemsPerPage));
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endIndex = computed(() =>
  Math.min(startIndex.value + itemsPerPage, totalContent.value)
);

// Methods
const checkReportsFilter = (reports) => {
  switch (reportsFilter.value) {
    case "none":
      return reports === 0;
    case "low":
      return reports >= 1 && reports <= 2;
    case "medium":
      return reports >= 3 && reports <= 5;
    case "high":
      return reports > 5;
    default:
      return true;
  }
};

const applyFilters = () => {
  currentPage.value = 1;
  // Additional filter logic can be added here
};

const clearFilters = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  typeFilter.value = "";
  reportsFilter.value = "";
  dateFrom.value = "";
  dateTo.value = "";
  currentPage.value = 1;
};

const handleContentAction = ({ content, action }) => {
  selectedContent.value = content;
  selectedAction.value = action;
  showActionModal.value = true;
};

const confirmAction = (actionData) => {
  const content = contentItems.value.find(
    (item) => item.id === selectedContent.value.id
  );
  if (content) {
    switch (selectedAction.value) {
      case "approve":
        content.status = "Approved";
        content.reports = 0;
        break;
      case "reject":
        content.status = "Rejected";
        break;
      case "delete":
        const index = contentItems.value.findIndex(
          (item) => item.id === content.id
        );
        if (index > -1) {
          contentItems.value.splice(index, 1);
        }
        break;
    }
  }
  showActionModal.value = false;
};

onMounted(() => {
  // Fetch content data
  // fetchContentData();
});
</script>

<style scoped>
.content-moderation {
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

.content-controls {
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

.filter-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.filter-button {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-button:hover {
  background-color: #f9fafb;
}

.filter-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.status-filter,
.type-filter {
  position: relative;
}

.status-select,
.type-select {
  appearance: none;
  padding: 10px 40px 10px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  min-width: 140px;
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

.advanced-filters {
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.filter-row {
  display: flex;
  align-items: end;
  gap: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 12px;
  font-weight: 500;
  color: #374151;
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
}

.filter-separator {
  align-self: end;
  padding: 8px 8px;
  font-size: 14px;
  color: #6b7280;
}

.apply-filters-button {
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

.apply-filters-button:hover {
  background-color: #4338ca;
}

.clear-filters-button {
  padding: 8px 16px;
  background-color: white;
  color: #374151;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.clear-filters-button:hover {
  background-color: #f9fafb;
}

.content-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  overflow-x: auto;
  margin-bottom: 20px;
}

.content-table {
  width: 100%;
  border-collapse: collapse;
}

.content-table th {
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
  .content-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-controls {
    justify-content: space-between;
  }

  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }

  .pagination {
    flex-direction: column;
    text-align: center;
  }
}
</style>

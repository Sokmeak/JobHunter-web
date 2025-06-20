```vue
<template>
  <header class="dashboard-header">
    <div class="header-content">
      <div class="title-section">
        <h1 class="title">Dashboard</h1>
        <p class="welcome-message">
          Welcome back, {{ dashboardData.username }}! Here is what's happening
          on <span class="highlight">JobHunter</span> Today.
        </p>
      </div>
      <div class="actions">
        <!-- Simplified Date Button with Datepicker -->
        <button
          class="btn btn-outline-primary d-flex align-items-center gap-2"
          @click="toggleDatepickerAndSetFilter"
        >
          <i class="bi bi-calendar button-icon"></i>
          <span>{{ currentFilter }}</span>
        </button>
        <div v-if="showDatepicker" class="datepicker-container">
          <VueDatePicker
            v-model="selectedDate"
            @update:model-value="hideDatepicker"
            :inline="false"
            :enable-time-picker="false"
            auto-apply
            :close-on-auto-apply="true"
            :clearable="true"
            :text-input="false"
          />
        </div>

        <!-- Refresh Button -->
        <button
          class="btn btn-outline-secondary d-flex align-items-center gap-2"
          @click="refreshPage"
        >
          <i class="bi bi-arrow-clockwise button-icon"></i>
          <span>Refresh</span>
        </button>

        <!-- Export Button -->
        <button
          class="btn btn-outline-secondary d-flex align-items-center gap-2"
          @click="exportStatCardsToPdf"
        >
          <i class="bi bi-download button-icon"></i>
          <span>Export</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { inject, ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
import "dayjs/locale/en";

const dashboardData = inject("dashboardData");
const selectedDate = inject("selectedDate");
const exportStatCardsToPdf = inject("exportStatCardsToPdf");

const showDatepicker = ref(false);
const currentFilter = ref("Today - Monday, June 02, 2025, 02:51 PM"); // Default filter with current time

// Current date and time (02:51 PM +07, Monday, June 02, 2025)
const now = dayjs("2025-06-02T14:51:00+07:00");

// Toggle datepicker and set filter
const toggleDatepickerAndSetFilter = () => {
  showDatepicker.value = !showDatepicker.value;
  if (!showDatepicker.value) {
    selectedDate.value = now.toDate(); // Set to today by default
  }
};

// Hide datepicker after selection
const hideDatepicker = (newDate) => {
  showDatepicker.value = false;
  if (newDate) {
    const today = now.toDate();
    const yesterday = now.subtract(1, "day").toDate();
    const diffTime = today.getTime() - newDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      currentFilter.value = `Today - ${now.format(
        "dddd, MMMM DD, YYYY, hh:mm A"
      )}`;
    } else if (diffDays === 1) {
      currentFilter.value = `Yesterday - ${dayjs(newDate).format(
        "dddd, MMMM DD, YYYY"
      )}`;
    } else if (diffDays >= 7 && diffDays <= 13) {
      const startOfWeek = now.subtract(1, "week").startOf("week");
      const endOfWeek = now.subtract(1, "week").endOf("week");
      currentFilter.value = `Last Week - ${startOfWeek.format(
        "MMM DD"
      )} to ${endOfWeek.format("MMM DD")}`;
    } else if (newDate.getMonth() === today.getMonth() - 1) {
      const lastMonthStart = now.subtract(1, "month").startOf("month");
      currentFilter.value = `Last Month - ${lastMonthStart.format("MMM YYYY")}`;
    } else {
      currentFilter.value = "Overall - All Time";
    }
  }
};

// Refresh page
const refreshPage = () => {
  window.location.reload();
};

// Logout function
const logout = () => {
  localStorage.removeItem("userToken"); // Example: remove token
  dashboardData.username = ""; // Clear username
  window.location.href = "/login"; // Redirect to login page
};
</script>

<style scoped>
.dashboard-header {
  margin-bottom: 20px;
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
}

.title-section {
  flex: 1;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.welcome-message {
  color: #6b7280;
  font-size: 14px;
}
.btn {
  background-color: #4f46e5;
  color: white;
}
.btn-outline-secondary {
  background-color: #f8f9ff;
  color: #000;
}
.btn:hover {
  background-color: #4338ca;
}

.highlight {
  color: #4f46e5;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 10px;
}

.button-icon {
  font-size: 16px;
}

.datepicker-container {
  position: absolute;
  z-index: 1000;
  top: 80%;
  right: 20px;
  margin-top: 1px;
  border-radius: 8px;
  overflow: hidden;
  min-width: 300px;
  min-height: 400px;
}

.dp__main {
  width: auto !important;
  min-width: 280px;
}

@media (max-width: 640px) {
  .header-content {
    flex-direction: column;
  }

  .actions {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
```

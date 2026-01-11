<template>
  <div class="card border-0 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h2 class="fw-bold mb-2">Good morning, {{ userName }}</h2>
          <p class="text-muted mb-0">
            Here is what's happening with your job search applications from
            {{ formatDate(dateRange.start) }} - {{ formatDate(dateRange.end) }}.
          </p>
        </div>
        <div
          ref="dateTrigger"
          class="border rounded d-flex align-items-center px-3 py-2 position-relative date-picker-trigger"
          style="cursor: pointer; user-select: none"
          @click="toggleDatePicker"
        >
          <span>
            {{ formatDate(dateRange.start) }} - {{ formatDate(dateRange.end) }}
          </span>
          <i class="bi bi-calendar ms-2 text-primary"></i>
        </div>
      </div>
    </div>

    <!-- Backdrop to close date picker when clicking outside -->
    <div
      v-if="showDatePicker"
      class="position-fixed top-0 start-0 w-100 h-100"
      style="z-index: 999"
      @click="cancelDatePicker"
    ></div>

    <!-- Teleported Date Picker -->
    <Teleport to="body">
      <div
        v-if="showDatePicker"
        class="bg-white border rounded shadow-lg p-3"
        :style="dropdownStyles"
        @click.stop
      >
        <div class="mb-3">
          <label class="form-label small fw-bold">Start Date</label>
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="tempStartDate"
            @change="updateDates"
          />
        </div>
        <div class="mb-3">
          <label class="form-label small fw-bold">End Date</label>
          <input
            type="date"
            class="form-control form-control-sm"
            v-model="tempEndDate"
            @change="updateDates"
          />
        </div>
        <div class="d-flex gap-2">
          <button
            class="btn btn-primary btn-sm flex-fill"
            @click="applyDateRange"
          >
            Apply
          </button>
          <button
            class="btn btn-outline-secondary btn-sm flex-fill"
            @click="cancelDatePicker"
          >
            Cancel
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from "vue";

const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  dateRange: {
    type: Object,
    required: true,
    validator: (value) => value && value.start && value.end,
  },
});

const emit = defineEmits(["update:dateRange", "dateRangeChanged"]);

const showDatePicker = ref(false);
const tempStartDate = ref("");
const tempEndDate = ref("");
const dropdownStyles = ref({});
const dateTrigger = ref(null);

// Formatters
const formatDate = (date) => {
  if (!date) return "";
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const formatDateForInput = (date) => {
  const dateObj = new Date(date);
  return !isNaN(dateObj.getTime()) ? dateObj.toISOString().split("T")[0] : "";
};

// Watch for props.dateRange change
watch(
  () => props.dateRange,
  (newRange) => {
    tempStartDate.value = formatDateForInput(newRange.start);
    tempEndDate.value = formatDateForInput(newRange.end);
  },
  { immediate: true }
);

// Position the dropdown under the trigger
const updateDropdownPosition = () => {
  nextTick(() => {
    const trigger = dateTrigger.value;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      dropdownStyles.value = {
        position: "absolute",
        top: `${rect.bottom + window.scrollY + 8}px`,
        left: `${rect.left + window.scrollX}px`,
        zIndex: 1000,
        minWidth: "300px",
      };
    }
  });
};

const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value;
  if (showDatePicker.value) {
    updateDropdownPosition();
    tempStartDate.value = formatDateForInput(props.dateRange.start);
    tempEndDate.value = formatDateForInput(props.dateRange.end);
  }
};

const applyDateRange = () => {
  if (tempStartDate.value && tempEndDate.value) {
    const newRange = {
      start: tempStartDate.value,
      end: tempEndDate.value,
    };
    emit("update:dateRange", newRange);
    emit("dateRangeChanged", newRange);
  }
  showDatePicker.value = false;
};

const cancelDatePicker = () => {
  showDatePicker.value = false;
  tempStartDate.value = formatDateForInput(props.dateRange.start);
  tempEndDate.value = formatDateForInput(props.dateRange.end);
};

const updateDates = () => {
  if (
    tempStartDate.value &&
    tempEndDate.value &&
    new Date(tempStartDate.value) > new Date(tempEndDate.value)
  ) {
    tempEndDate.value = tempStartDate.value;
  }
};
</script>

<style scoped>
.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.btn:focus {
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>

<template>
  <div class="card border-0 mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h2 class="fw-bold mb-2">Good morning, {{ userName }}</h2>
          <p class="text-muted mb-0">
            Here is what's happening with your job search applications from {{ formatDate(dateRange.start) }} - {{ formatDate(dateRange.end) }}.
          </p>
        </div>
        <div class="border rounded d-flex align-items-center px-3 py-2 position-relative" 
             style="cursor: pointer; user-select: none;"
             @click="toggleDatePicker">
          <span>{{ formatDate(dateRange.start) }} - {{ formatDate(dateRange.end) }}</span>
          <i class="bi bi-calendar ms-2 text-primary"></i>
          
          <!-- Date Picker Dropdown -->
          <div v-if="showDatePicker" 
               class="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow-lg p-3"
               style="z-index: 1000; min-width: 300px;"
               @click.stop>
            <div class="mb-3">
              <label class="form-label small fw-bold">Start Date</label>
              <input 
                type="date" 
                class="form-control form-control-sm"
                v-model="tempStartDate"
                @change="updateDates">
            </div>
            <div class="mb-3">
              <label class="form-label small fw-bold">End Date</label>
              <input 
                type="date" 
                class="form-control form-control-sm"
                v-model="tempEndDate"
                @change="updateDates">
            </div>
            <div class="d-flex gap-2">
              <button class="btn btn-primary btn-sm flex-fill" @click="applyDateRange">
                Apply
              </button>
              <button class="btn btn-outline-secondary btn-sm flex-fill" @click="cancelDatePicker">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Backdrop to close date picker when clicking outside -->
    <div v-if="showDatePicker" 
         class="position-fixed top-0 start-0 w-100 h-100" 
         style="z-index: 999;"
         @click="cancelDatePicker">
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  userName: {
    type: String,
    required: true
  },
  dateRange: {
    type: Object,
    required: true,
    validator: (value) => {
      return value && value.start && value.end
    }
  }
})

const emit = defineEmits(['update:dateRange', 'dateRangeChanged'])

// Reactive data
const showDatePicker = ref(false)
const tempStartDate = ref('')
const tempEndDate = ref('')

// Note: localStorage is not supported in Claude.ai artifacts
// This code is for use in your own development environment
const loadDateRangeFromStorage = () => {
  try {
    const stored = localStorage.getItem('dateRange')
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error('Error loading date range from localStorage:', error)
  }
  return null
}

const saveDateRangeToStorage = (dateRange) => {
  try {
    localStorage.setItem('dateRange', JSON.stringify(dateRange))
  } catch (error) {
    console.error('Error saving date range to localStorage:', error)
  }
}

// Utility functions - Define these BEFORE the watch
const formatDate = (date) => {
  if (!date) return ''
  
  // If it's already a formatted string, return as is
  if (typeof date === 'string' && date.includes('/')) {
    return date
  }
  
  // If it's a date string in YYYY-MM-DD format, convert to MM/DD/YYYY
  const dateObj = new Date(date)
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    })
  }
  
  return date
}
const formatDateForInput = (date) => {
  if (!date) return ''
  
  // If it's already in YYYY-MM-DD format, return as is
  if (typeof date === 'string' && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return date
  }
  
  // Convert from MM/DD/YYYY or other formats to YYYY-MM-DD
  const dateObj = new Date(date)
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toISOString().split('T')[0]
  }
  
  return date
}

// Initialize temp dates when component mounts or dateRange changes
watch(() => props.dateRange, (newRange) => {
  if (newRange) {
    tempStartDate.value = formatDateForInput(newRange.start)
    tempEndDate.value = formatDateForInput(newRange.end)
  }
}, { immediate: true })

// Methods
const toggleDatePicker = () => {
  showDatePicker.value = !showDatePicker.value
  if (showDatePicker.value) {
    // Reset temp dates to current values when opening
    tempStartDate.value = formatDateForInput(props.dateRange.start)
    tempEndDate.value = formatDateForInput(props.dateRange.end)
  }
}

const applyDateRange = () => {
  if (tempStartDate.value && tempEndDate.value) {
    const newDateRange = {
      start: tempStartDate.value,
      end: tempEndDate.value
    }
    
    // Save to localStorage (only works in your own environment)
    saveDateRangeToStorage(newDateRange)
    
    // Emit both events for flexibility
    emit('update:dateRange', newDateRange)
    emit('dateRangeChanged', newDateRange)
  }
  showDatePicker.value = false
}

const cancelDatePicker = () => {
  showDatePicker.value = false
  // Reset temp dates to original values
  tempStartDate.value = formatDateForInput(props.dateRange.start)
  tempEndDate.value = formatDateForInput(props.dateRange.end)
}

const updateDates = () => {
  // Ensure start date is not after end date
  if (tempStartDate.value && tempEndDate.value) {
    if (new Date(tempStartDate.value) > new Date(tempEndDate.value)) {
      tempEndDate.value = tempStartDate.value
    }
  }
}
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
<template>
  <div class="card h-100">
    <div class="card-header bg-white border-bottom">
      <h5 class="card-title mb-0">Upcoming Interviews</h5>
    </div >
    <div class="d-flex justify-content-between align-items-center"></div>
    <div class="card-header bg-white border-bottom">
      <div class="d-flex justify-content-between align-items-center ">
      <h5 class="mb-0 text-muted ">{{ formattedCurrentDate }}</h5>
      <div><button 
          class="btn btn-link p-1 text-muted"
          @click="navigateDate(-1)"
          :disabled="!canNavigatePrevious"
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <button 
          class="btn btn-link p-1 text-muted"
          @click="navigateDate(1)"
          :disabled="!canNavigateNext"
        >
          <i class="bi bi-chevron-right"></i>
        </button></div>
      
      </div>
    </div>
    <div class="card-body">
      <!-- Date Navigation -->

      <!-- Interview Timeline -->
      <div class="interview-timeline">
        <div v-if="todayInterviews.length === 0" class="text-center text-muted py-4">
          <i class="bi bi-calendar-x fs-1 text-muted mb-2"></i>
          <p class="mb-0">No interviews scheduled for this date</p>
        </div>
        
        <div v-else>
          <!-- Dynamic time slots based on interviews -->
          <div 
            v-for="timeSlot in dynamicTimeSlots" 
            :key="timeSlot"
            class="time-slot mb-3"
          >
            <div class="d-flex">
              <!-- Time -->
              <div class="time-label me-3">
                <span class="text-muted small">{{ timeSlot }}</span>
              </div>
              
              <!-- Interview or empty slot -->
              <div class="flex-grow-1">
                <div 
                  v-if="getInterviewForTime(timeSlot)"
                  class="interview-item p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-25"
                >
                  <div class="d-flex align-items-center">
                    <img 
                      :src="getInterviewForTime(timeSlot).avatar" 
                      :alt="getInterviewForTime(timeSlot).name"
                      class="rounded-circle me-3"
                      width="48"
                      height="48"
                      style="object-fit: cover;"
                    >
                    <div>
                      <h6 class="mb-1 fw-semibold text-primary">{{ getInterviewForTime(timeSlot).name }}</h6>
                      <p class="mb-0 text-muted small">{{ getInterviewForTime(timeSlot).position }}</p>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-slot">
                  <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                      <hr class="text-muted opacity-25 my-2">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
// Fixed setup function - replace your existing setup function with this:

import { ref, computed, watch } from 'vue'

export default {
  name: 'UpcomingInterviews',
  props: {
    interviews: {
      type: Array,
      default: () => []
    },
    maxDaysAhead: {
      type: Number,
      default: 30
    },
    maxDaysBehind: {
      type: Number,
      default: 7
    }
  },
  setup(props) {
    const currentDate = ref(new Date())
    const currentInterviewIndex = ref(0)

    // Helper function to convert time string to minutes
    const timeToMinutes = (timeStr) => {
      const [time, period] = timeStr.split(' ')
      const [hours, minutes] = time.split(':').map(Number)
      let totalMinutes = hours * 60 + minutes
      
      if (period === 'PM' && hours !== 12) {
        totalMinutes += 12 * 60
      } else if (period === 'AM' && hours === 12) {
        totalMinutes = minutes
      }
      
      return totalMinutes
    }

    // Helper function to convert minutes to time string
    const minutesToTime = (minutes) => {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      const period = hours >= 12 ? 'PM' : 'AM'
      const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
      
      return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`
    }

    const todayInterviews = computed(() => {
      const currentDateStr = currentDate.value.toISOString().split('T')[0]
      const interviews = props.interviews.filter(interview => 
        interview.date === currentDateStr
      )
      return interviews.sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
    })

    const currentInterview = computed(() => {
      if (todayInterviews.value.length === 0) return null
      return todayInterviews.value[currentInterviewIndex.value] || todayInterviews.value[0]
    })

    const dynamicTimeSlots = computed(() => {
      if (!currentInterview.value) return []

      const interviewMinutes = timeToMinutes(currentInterview.value.time)
      const startTime = Math.max(interviewMinutes - 30, 7 * 60)
      const endTime = Math.min(interviewMinutes + 30, 20 * 60)
      
      const slots = []
      for (let minutes = startTime; minutes <= endTime; minutes += 30) {
        slots.push(minutesToTime(minutes))
      }
      
      return slots
    })

    const formattedCurrentDate = computed(() => {
      const today = new Date()
      const current = new Date(currentDate.value)
      
      // Normalize dates to compare only the date part (ignore time)
      const todayStr = today.toDateString()
      const currentStr = current.toDateString()
      
      let dateStr = ''
      if (todayStr === currentStr) {
        dateStr = 'Today, ' + current.toLocaleDateString('en-US', { 
          day: 'numeric', 
          month: 'long' 
        })
      } else {
        const diffTime = current.getTime() - today.getTime()
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
        
        if (diffDays === -1) {
          dateStr = 'Yesterday, ' + current.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'long' 
          })
        } else if (diffDays === 1) {
          dateStr = 'Tomorrow, ' + current.toLocaleDateString('en-US', { 
            day: 'numeric', 
            month: 'long' 
          })
        } else {
          dateStr = current.toLocaleDateString('en-US', { 
            weekday: 'long',
            day: 'numeric', 
            month: 'long' 
          })
        }
      }

      if (todayInterviews.value.length > 1 && currentInterview.value) {
        dateStr += ` • Interview ${currentInterviewIndex.value + 1} of ${todayInterviews.value.length} (${currentInterview.value.time})`
      } else if (currentInterview.value) {
        dateStr += ` • ${currentInterview.value.time}`
      }

      return dateStr
    })

    const canNavigatePrevious = computed(() => {
      if (todayInterviews.value.length <= 1) {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Normalize to start of day
        
        const minDate = new Date(today.getTime() - (props.maxDaysBehind * 24 * 60 * 60 * 1000))
        const currentDateNormalized = new Date(currentDate.value)
        currentDateNormalized.setHours(0, 0, 0, 0)
        
        return currentDateNormalized > minDate
      } else {
        return currentInterviewIndex.value > 0
      }
    })

    const canNavigateNext = computed(() => {
      if (todayInterviews.value.length <= 1) {
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Normalize to start of day
        
        const maxDate = new Date(today.getTime() + (props.maxDaysAhead * 24 * 60 * 60 * 1000))
        const currentDateNormalized = new Date(currentDate.value)
        currentDateNormalized.setHours(0, 0, 0, 0)
        
        return currentDateNormalized < maxDate
      } else {
        return currentInterviewIndex.value < todayInterviews.value.length - 1
      }
    })

    const navigateDate = (direction) => {
      console.log('Navigating:', direction, 'Current date:', currentDate.value) // Debug log
      
      if (todayInterviews.value.length <= 1) {
        // Navigate between days
        const newDate = new Date(currentDate.value)
        newDate.setDate(newDate.getDate() + direction)
        currentDate.value = newDate
        currentInterviewIndex.value = 0
        
        console.log('New date:', newDate) // Debug log
      } else {
        // Navigate between interview windows
        const newIndex = currentInterviewIndex.value + direction
        if (newIndex >= 0 && newIndex < todayInterviews.value.length) {
          currentInterviewIndex.value = newIndex
        }
        
        console.log('New interview index:', newIndex) // Debug log
      }
    }

    // Properly watch for date changes and reset interview index
    watch(currentDate, () => {
      currentInterviewIndex.value = 0
    })

    const getInterviewForTime = (timeSlot) => {
      return todayInterviews.value.find(interview => interview.time === timeSlot)
    }

    return {
      currentDate,
      currentInterviewIndex,
      dynamicTimeSlots,
      formattedCurrentDate,
      todayInterviews,
      currentInterview,
      canNavigatePrevious,
      canNavigateNext,
      navigateDate,
      getInterviewForTime
    }
  }
}
</script>

<style scoped>
.interview-timeline {
  max-height: 400px;
  overflow-y: auto;
}

.time-label {
  width: 80px;
  text-align: right;
  padding-top: 0.5rem;
}

.interview-item {
  transition: all 0.2s ease;
  cursor: pointer;
}

.interview-item:hover {
  background-color: rgba(13, 110, 253, 0.15) !important;
  border-color: rgba(13, 110, 253, 0.5) !important;
}

.empty-slot {
  opacity: 0.6;
}

.empty-slot hr {
  margin: 0.5rem 0;
}

.btn-link:disabled {
  opacity: 0.3;
}

.card {
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border: 1px solid #D6DDEB;
}

.card-header {
  padding: 1rem 1.25rem;
}

.badge {
  font-size: 0.7rem;
}

@media (max-width: 768px) {
  .time-label {
    width: 60px;
    font-size: 0.75rem;
  }
  
  .interview-item {
    padding: 0.75rem !important;
  }
  
  .interview-item img {
    width: 40px !important;
    height: 40px !important;
  }
}
</style>
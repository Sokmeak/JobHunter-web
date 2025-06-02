<template>
<div class="my-schedule">
  <!-- Header -->
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h2 class="mb-1 fw-bold">My Schedule</h2>
      <p class="text-muted mb-0">Manage your interviews and meetings</p>
    </div>
    
    <div class="d-flex align-items-center gap-3">
      <!-- View Toggle -->
      <div class="btn-group" role="group">
        <button 
          type="button" 
          class="btn btn-sm"
          :class="viewMode === 'day' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="viewMode = 'day'"
        >
          Day
        </button>
        <button 
          type="button" 
          class="btn btn-sm"
          :class="viewMode === 'week' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="viewMode = 'week'"
        >
          Week
        </button>
        <button 
          type="button" 
          class="btn btn-sm"
          :class="viewMode === 'month' ? 'btn-primary' : 'btn-outline-secondary'"
          @click="viewMode = 'month'"
        >
          Month
        </button>
      </div>
      
      <button class="btn btn-primary" @click="scheduleInterview">
        <i class="bi bi-plus me-2"></i>Schedule Interview
      </button>
    </div>
  </div>

  <div class="row g-4">
    <!-- Calendar -->
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <!-- Calendar Header -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-outline-secondary btn-sm" @click="previousPeriod">
                <i class="bi bi-chevron-left"></i>
              </button>
              <h4 class="mb-0 fw-bold">{{ currentPeriodLabel }}</h4>
              <button class="btn btn-outline-secondary btn-sm" @click="nextPeriod">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
            <button class="btn btn-outline-primary btn-sm" @click="goToToday">
              Today
            </button>
          </div>

          <!-- Calendar Grid -->
          <div class="calendar-grid">
            <!-- Week View -->
            <div v-if="viewMode === 'week'" class="week-view">
              <!-- Days Header -->
              <div class="row g-0 mb-3">
                <div class="col-1"></div>
                <div v-for="day in weekDays" :key="day.date" class="col text-center">
                  <div class="fw-medium">{{ day.name }}</div>
                  <div class="text-muted small">{{ day.date }}</div>
                </div>
              </div>

              <!-- Time Slots -->
              <div class="time-slots">
                <div v-for="hour in timeSlots" :key="hour" class="row g-0 time-slot">
                  <div class="col-1 time-label">
                    <small class="text-muted">{{ hour }}:00</small>
                  </div>
                  <div v-for="day in weekDays" :key="`${day.date}-${hour}`" class="col time-cell">
                    <!-- Events for this time slot -->
                    <div 
                      v-for="event in getEventsForSlot(day.date, hour)" 
                      :key="event.id"
                      class="event-block"
                      :class="getEventClass(event.type)"
                      @click="viewEvent(event)"
                    >
                      <div class="event-title">{{ event.title }}</div>
                      <div class="event-time">{{ event.time }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Day View -->
            <div v-else-if="viewMode === 'day'" class="day-view">
              <div class="events-list">
                <div v-for="event in todayEvents" :key="event.id" class="event-item mb-3">
                  <div class="card border-0 shadow-sm">
                    <div class="card-body p-3">
                      <div class="d-flex align-items-start">
                        <div class="event-time-badge me-3">
                          <div class="fw-bold">{{ event.startTime }}</div>
                          <small class="text-muted">{{ event.duration }}</small>
                        </div>
                        <div class="flex-grow-1">
                          <h6 class="mb-1 fw-medium">{{ event.title }}</h6>
                          <p class="text-muted small mb-2">{{ event.description }}</p>
                          <div class="d-flex align-items-center gap-3">
                            <div class="d-flex align-items-center">
                              <img :src="event.candidate.avatar" :alt="event.candidate.name" class="rounded-circle me-2" style="width: 24px; height: 24px;">
                              <span class="small">{{ event.candidate.name }}</span>
                            </div>
                            <span class="badge" :class="getEventBadgeClass(event.type)">{{ event.type }}</span>
                          </div>
                        </div>
                        <div class="dropdown">
                          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click="editEvent(event.id)">Edit</a></li>
                            <li><a class="dropdown-item" href="#" @click="rescheduleEvent(event.id)">Reschedule</a></li>
                            <li><a class="dropdown-item" href="#" @click="joinMeeting(event.id)">Join Meeting</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item text-danger" href="#" @click="cancelEvent(event.id)">Cancel</a></li>
                          </ul>
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
    </div>

    <!-- Sidebar -->
    <div class="col-lg-4">
      <!-- Upcoming Interviews -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Upcoming Interviews</h6>
          <div class="upcoming-list">
            <div v-for="interview in upcomingInterviews" :key="interview.id" class="d-flex align-items-center mb-3 p-3 border rounded-3">
              <img :src="interview.candidate.avatar" :alt="interview.candidate.name" class="rounded-circle me-3" style="width: 40px; height: 40px;">
              <div class="flex-grow-1">
                <div class="fw-medium">{{ interview.candidate.name }}</div>
                <small class="text-muted">{{ interview.time }} • {{ interview.type }}</small>
              </div>
              <button class="btn btn-sm btn-outline-primary" @click="joinMeeting(interview.id)">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Quick Actions</h6>
          <div class="d-grid gap-2">
            <button class="btn btn-primary" @click="scheduleInterview">
              <i class="bi bi-calendar-plus me-2"></i>Schedule Interview
            </button>
            <button class="btn btn-outline-primary" @click="blockTime">
              <i class="bi bi-clock me-2"></i>Block Time
            </button>
            <button class="btn btn-outline-secondary" @click="viewAvailability">
              <i class="bi bi-calendar-check me-2"></i>Set Availability
            </button>
          </div>
        </div>
      </div>

      <!-- Calendar Mini -->
      <div class="card border-0 shadow-sm">
        <div class="card-body p-4">
          <h6 class="mb-3 fw-bold">Calendar</h6>
          <div class="mini-calendar">
            <!-- Mini calendar placeholder -->
            <div class="text-center py-4">
              <i class="bi bi-calendar3 text-muted" style="font-size: 2rem;"></i>
              <p class="text-muted mt-2 mb-0">Mini Calendar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const viewMode = ref('week')
const currentDate = ref(new Date())

const weekDays = ref([
  { name: 'Mon', date: '15' },
  { name: 'Tue', date: '16' },
  { name: 'Wed', date: '17' },
  { name: 'Thu', date: '18' },
  { name: 'Fri', date: '19' },
  { name: 'Sat', date: '20' },
  { name: 'Sun', date: '21' }
])

const timeSlots = ref([9, 10, 11, 12, 13, 14, 15, 16, 17])

const events = ref([
  {
    id: 1,
    title: 'Technical Interview',
    description: 'Frontend Developer Interview',
    date: '17',
    hour: 10,
    time: '10:00 AM',
    startTime: '10:00 AM',
    duration: '1 hour',
    type: 'Technical',
    candidate: {
      name: 'Jake Gyll',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+man+jake'
    }
  },
  {
    id: 2,
    title: 'HR Interview',
    description: 'Cultural Fit Assessment',
    date: '17',
    hour: 14,
    time: '2:00 PM',
    startTime: '2:00 PM',
    duration: '45 min',
    type: 'HR',
    candidate: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+woman+sarah'
    }
  },
  {
    id: 3,
    title: 'Final Interview',
    description: 'CEO Interview',
    date: '18',
    hour: 11,
    time: '11:00 AM',
    startTime: '11:00 AM',
    duration: '30 min',
    type: 'Final',
    candidate: {
      name: 'Mike Chen',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+man+mike'
    }
  }
])

const upcomingInterviews = ref([
  {
    id: 1,
    time: 'Today 10:00 AM',
    type: 'Technical',
    candidate: {
      name: 'Jake Gyll',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+man+jake'
    }
  },
  {
    id: 2,
    time: 'Today 2:00 PM',
    type: 'HR',
    candidate: {
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+woman+sarah'
    }
  },
  {
    id: 3,
    time: 'Tomorrow 11:00 AM',
    type: 'Final',
    candidate: {
      name: 'Mike Chen',
      avatar: '/placeholder.svg?height=40&width=40&query=professional+man+mike'
    }
  }
])

const currentPeriodLabel = computed(() => {
  if (viewMode.value === 'week') {
    return 'January 15 - 21, 2024'
  } else if (viewMode.value === 'day') {
    return 'Today, January 17, 2024'
  } else {
    return 'January 2024'
  }
})

const todayEvents = computed(() => {
  return events.value.filter(event => event.date === '17')
})

const getEventsForSlot = (date, hour) => {
  return events.value.filter(event => event.date === date && event.hour === hour)
}

const getEventClass = (type) => {
  switch (type) {
    case 'Technical':
      return 'event-technical'
    case 'HR':
      return 'event-hr'
    case 'Final':
      return 'event-final'
    default:
      return 'event-default'
  }
}

const getEventBadgeClass = (type) => {
  switch (type) {
    case 'Technical':
      return 'bg-primary-subtle text-primary'
    case 'HR':
      return 'bg-success-subtle text-success'
    case 'Final':
      return 'bg-warning-subtle text-warning'
    default:
      return 'bg-secondary-subtle text-secondary'
  }
}

const previousPeriod = () => {
  console.log('Previous period')
}

const nextPeriod = () => {
  console.log('Next period')
}

const goToToday = () => {
  console.log('Go to today')
}

const scheduleInterview = () => {
  console.log('Schedule interview')
}

const viewEvent = (event) => {
  console.log('View event:', event)
}

const editEvent = (eventId) => {
  console.log('Edit event:', eventId)
}

const rescheduleEvent = (eventId) => {
  console.log('Reschedule event:', eventId)
}

const joinMeeting = (eventId) => {
  console.log('Join meeting:', eventId)
}

const cancelEvent = (eventId) => {
  console.log('Cancel event:', eventId)
}

const blockTime = () => {
  console.log('Block time')
}

const viewAvailability = () => {
  console.log('View availability')
}
</script>

<style scoped>
.time-slot {
  min-height: 60px;
  border-bottom: 1px solid #f1f5f9;
}

.time-label {
  padding: 8px;
  border-right: 1px solid #f1f5f9;
  font-size: 0.75rem;
}

.time-cell {
  border-right: 1px solid #f1f5f9;
  position: relative;
  padding: 4px;
}

.event-block {
  background: #6366f1;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 2px 0;
  cursor: pointer;
  font-size: 0.75rem;
}

.event-technical {
  background: #6366f1;
}

.event-hr {
  background: #10b981;
}

.event-final {
  background: #f59e0b;
}

.event-title {
  font-weight: 500;
}

.event-time {
  opacity: 0.8;
}

.event-time-badge {
  text-align: center;
  min-width: 80px;
}

.upcoming-list .border:hover {
  border-color: #6366f1 !important;
  background-color: #f8fafc;
}
</style>

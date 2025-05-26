<template>
  <div class="schedule-calendar">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <h4 class="mb-0 me-4">My Schedule</h4>
        <button class="btn btn-outline-primary me-2" @click="goToToday">
          Today
        </button>
      </div>
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-primary" @click="createEvent">
          <i class="bi bi-plus me-1"></i>Create Event
        </button>
        <div class="btn-group">
          <button
            class="btn"
            :class="
              viewMode === 'month' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="changeView('month')"
          >
            Month
          </button>
          <button
            class="btn"
            :class="
              viewMode === 'week' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="changeView('week')"
          >
            Week
          </button>
          <button
            class="btn"
            :class="
              viewMode === 'day' ? 'btn-primary' : 'btn-outline-secondary'
            "
            @click="changeView('day')"
          >
            Day
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3">
        <div class="card border-0 shadow-sm mb-4">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h6 class="mb-0">{{ currentMonthYear }}</h6>
            <div>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="previousMonth"
              >
                <i class="bi bi-chevron-left"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="nextMonth"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="mini-calendar">
              <div class="row text-center mb-2">
                <div
                  class="col fw-bold small text-muted"
                  v-for="day in [
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                  ]"
                  :key="day"
                >
                  {{ day }}
                </div>
              </div>
              <div
                class="row text-center"
                v-for="week in miniCalendarWeeks"
                :key="week.id"
              >
                <div
                  class="col p-1"
                  v-for="day in week.days"
                  :key="day.date"
                  @click="selectDate(day.date)"
                >
                  <div
                    class="mini-day rounded d-flex align-items-center justify-content-center"
                    :class="{
                      'bg-primary text-white': day.isSelected,
                      'text-muted': !day.isCurrentMonth,
                      'fw-bold': day.isToday,
                      'has-events': day.hasEvents,
                    }"
                    style="height: 32px; cursor: pointer"
                  >
                    {{ day.day }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card border-0 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <h6 class="mb-0">Categories</h6>
            <button class="btn btn-sm btn-primary" @click="addCategory">
              <i class="bi bi-plus me-1"></i>Add Category
            </button>
          </div>
          <div class="card-body">
            <div
              class="form-check mb-2"
              v-for="category in eventCategories"
              :key="category.id"
            >
              <input
                class="form-check-input"
                type="checkbox"
                :id="'category-' + category.id"
                v-model="category.visible"
                @change="toggleCategoryVisibility(category)"
              />
              <label
                class="form-check-label d-flex align-items-center"
                :for="'category-' + category.id"
              >
                <div
                  class="category-color me-2 rounded-circle"
                  :style="{
                    backgroundColor: category.color,
                    width: '12px',
                    height: '12px',
                  }"
                ></div>
                {{ category.name }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="card border-0 shadow-sm">
          <div
            class="card-header bg-white d-flex justify-content-between align-items-center"
          >
            <div class="d-flex align-items-center">
              <button
                class="btn btn-sm btn-outline-secondary me-2"
                @click="previousPeriod"
              >
                <i class="bi bi-chevron-left"></i>
              </button>
              <h5 class="mb-0 me-2">{{ currentPeriodTitle }}</h5>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="nextPeriod"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
            <small class="text-muted">GMT -07</small>
          </div>
          <div class="card-body p-0">
            <!-- Week View -->
            <div v-if="viewMode === 'week'" class="week-view">
              <div class="row g-0 border-bottom">
                <div class="col-1 p-2 border-end"></div>
                <div
                  class="col p-2 text-center border-end"
                  v-for="day in weekDays"
                  :key="day.date"
                >
                  <div class="fw-medium">{{ day.dayName }}</div>
                  <div
                    class="h5 mb-0"
                    :class="{
                      'text-primary bg-primary bg-opacity-10 rounded-circle':
                        day.isToday,
                    }"
                    style="
                      width: 32px;
                      height: 32px;
                      line-height: 32px;
                      margin: 0 auto;
                    "
                  >
                    {{ day.dayNumber }}
                  </div>
                </div>
              </div>

              <!-- Time slots -->
              <div
                class="time-slots"
                style="max-height: 600px; overflow-y: auto"
              >
                <div class="row g-0" v-for="hour in timeSlots" :key="hour.time">
                  <div class="col-1 p-2 border-end border-bottom text-end">
                    <small class="text-muted">{{ hour.display }}</small>
                  </div>
                  <div
                    class="col border-end border-bottom position-relative"
                    v-for="day in weekDays"
                    :key="day.date"
                    style="height: 60px"
                  >
                    <!-- Events for this time slot -->
                    <div
                      v-for="event in getEventsForSlot(day.date, hour.time)"
                      :key="event.id"
                      class="event-block position-absolute w-100 rounded p-1 text-white small"
                      :style="{
                        backgroundColor: event.color,
                        top: '2px',
                        left: '2px',
                        right: '2px',
                      }"
                    >
                      {{ event.title }}
                      <div v-if="event.time" class="small opacity-75">
                        {{ event.time }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Month View -->
            <div v-else-if="viewMode === 'month'" class="month-view">
              <div class="row g-0">
                <div
                  class="col text-center p-2 border-end border-bottom fw-medium bg-light"
                  v-for="day in [
                    'SUN',
                    'MON',
                    'TUE',
                    'WED',
                    'THU',
                    'FRI',
                    'SAT',
                  ]"
                  :key="day"
                >
                  {{ day }}
                </div>
              </div>
              <div class="row g-0" v-for="week in monthWeeks" :key="week.id">
                <div
                  class="col border-end border-bottom p-1"
                  v-for="day in week.days"
                  :key="day.date"
                  style="height: 120px"
                >
                  <div
                    class="d-flex justify-content-between align-items-start mb-1"
                  >
                    <span
                      class="small fw-medium"
                      :class="{
                        'text-muted': !day.isCurrentMonth,
                        'text-primary': day.isToday,
                      }"
                    >
                      {{ day.dayNumber }}
                    </span>
                    <span v-if="day.isToday" class="badge bg-danger small"
                      >Holiday</span
                    >
                  </div>
                  <div class="events-container">
                    <div
                      v-for="event in day.events"
                      :key="event.id"
                      class="event-item small rounded px-1 mb-1 text-white"
                      :style="{ backgroundColor: event.color }"
                    >
                      {{ event.title }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Day View -->
            <div v-else class="day-view">
              <div class="text-center py-5">
                <i
                  class="bi bi-calendar-day text-muted"
                  style="font-size: 3rem"
                ></i>
                <h6 class="mt-3">Day View</h6>
                <p class="text-muted">
                  Detailed day view would be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const viewMode = ref("week");
const currentDate = ref(new Date(2021, 10, 24)); // November 24, 2021
const selectedDate = ref(new Date(2021, 10, 24));

const eventCategories = ref([
  { id: 1, name: "Interview Schedule", color: "#6366f1", visible: true },
  { id: 2, name: "Internal Meeting", color: "#10b981", visible: true },
  { id: 3, name: "Team Schedule", color: "#f59e0b", visible: false },
  { id: 4, name: "My Task", color: "#ef4444", visible: false },
  { id: 5, name: "Reminders", color: "#8b5cf6", visible: false },
]);

const events = ref([
  {
    id: 1,
    title: "Interview session with Kathryn Murphy",
    date: "2021-11-24",
    time: "02:00 - 05:00 AM",
    hour: 2,
    color: "#3b82f6",
    category: "Interview Schedule",
  },
  {
    id: 2,
    title: "Interview sess...",
    date: "2021-11-24",
    time: "08:00 - 09:00 AM",
    hour: 8,
    color: "#3b82f6",
    category: "Interview Schedule",
  },
  {
    id: 3,
    title: "Meeting with s...",
    date: "2021-11-24",
    time: "09:00 - 10:00 AM",
    hour: 9,
    color: "#10b981",
    category: "Internal Meeting",
  },
]);

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
});

const currentPeriodTitle = computed(() => {
  if (viewMode.value === "week") {
    return "NOVEMBER 2021";
  } else if (viewMode.value === "month") {
    return currentMonthYear.value;
  } else {
    return selectedDate.value.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
});

const weekDays = computed(() => {
  const startOfWeek = new Date(currentDate.value);
  startOfWeek.setDate(currentDate.value.getDate() - currentDate.value.getDay());

  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);

    days.push({
      date: day.toISOString().split("T")[0],
      dayName: day
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      dayNumber: day.getDate(),
      isToday: day.toDateString() === new Date(2021, 10, 24).toDateString(),
    });
  }

  return days;
});

const timeSlots = computed(() => {
  const slots = [];
  for (let hour = 1; hour <= 12; hour++) {
    slots.push({
      time: hour,
      display: `${hour} AM`,
    });
  }
  return slots;
});

const miniCalendarWeeks = computed(() => {
  const weeks = [];
  const startOfMonth = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1
  );
  const startOfCalendar = new Date(startOfMonth);
  startOfCalendar.setDate(startOfCalendar.getDate() - startOfMonth.getDay());

  const today = new Date(2021, 10, 24);
  let currentWeekStart = new Date(startOfCalendar);

  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const currentDay = new Date(currentWeekStart);
      currentDay.setDate(currentWeekStart.getDate() + day);

      const hasEvents = events.value.some((event) => {
        return event.date === currentDay.toISOString().split("T")[0];
      });

      weekDays.push({
        date: currentDay.toISOString().split("T")[0],
        day: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === currentDate.value.getMonth(),
        isToday: currentDay.toDateString() === today.toDateString(),
        isSelected:
          currentDay.toDateString() === selectedDate.value.toDateString(),
        hasEvents,
      });
    }
    weeks.push({ id: week, days: weekDays });
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
});

const monthWeeks = computed(() => {
  const weeks = [];
  const startOfMonth = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth(),
    1
  );
  const startOfCalendar = new Date(startOfMonth);
  startOfCalendar.setDate(startOfCalendar.getDate() - startOfMonth.getDay());

  let currentWeekStart = new Date(startOfCalendar);

  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const currentDay = new Date(currentWeekStart);
      currentDay.setDate(currentWeekStart.getDate() + day);

      const dayEvents = events.value.filter(
        (event) => event.date === currentDay.toISOString().split("T")[0]
      );

      weekDays.push({
        date: currentDay.toISOString().split("T")[0],
        dayNumber: currentDay.getDate(),
        isCurrentMonth: currentDay.getMonth() === currentDate.value.getMonth(),
        isToday: currentDay.getDate() === 27 && currentDay.getMonth() === 10,
        events: dayEvents,
      });
    }
    weeks.push({ id: week, days: weekDays });
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  }

  return weeks;
});

const getEventsForSlot = (date, hour) => {
  return events.value.filter(
    (event) => event.date === date && event.hour === hour
  );
};

const changeView = (view) => {
  viewMode.value = view;
  console.log("View changed to:", view);
};

const goToToday = () => {
  currentDate.value = new Date(2021, 10, 24);
  selectedDate.value = new Date(2021, 10, 24);
};

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  );
};

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  );
};

const previousPeriod = () => {
  if (viewMode.value === "week") {
    currentDate.value = new Date(
      currentDate.value.getTime() - 7 * 24 * 60 * 60 * 1000
    );
  } else if (viewMode.value === "month") {
    previousMonth();
  }
};

const nextPeriod = () => {
  if (viewMode.value === "week") {
    currentDate.value = new Date(
      currentDate.value.getTime() + 7 * 24 * 60 * 60 * 1000
    );
  } else if (viewMode.value === "month") {
    nextMonth();
  }
};

const selectDate = (dateStr) => {
  selectedDate.value = new Date(dateStr);
  console.log("Date selected:", dateStr);
};

const createEvent = () => {
  console.log("Creating new event");
};

const addCategory = () => {
  console.log("Adding new category");
};

const toggleCategoryVisibility = (category) => {
  console.log("Toggling category visibility:", category.name, category.visible);
};
</script>

<style scoped>
.mini-day:hover {
  background-color: #f8f9fa;
}

.mini-day.has-events {
  position: relative;
}

.mini-day.has-events::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background-color: #6366f1;
  border-radius: 50%;
}

.event-block {
  font-size: 0.75rem;
  line-height: 1.2;
}

.event-item {
  font-size: 0.7rem;
  line-height: 1.1;
}

.time-slots {
  border-top: 1px solid #dee2e6;
}

.events-container {
  max-height: 80px;
  overflow: hidden;
}
</style>

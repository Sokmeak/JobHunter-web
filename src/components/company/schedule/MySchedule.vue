<template>
  <div class="my-schedule">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-0">My Schedule</h2>
      </div>
      <div class="d-flex align-items-center gap-2">
        <div class="date-range bg-white border rounded px-3 py-2">
          <i class="bi bi-calendar me-2"></i>
          <span>{{ currentDateRange }}</span>
        </div>
        <button class="btn btn-primary">
          <i class="bi bi-plus me-1"></i>
          Add Schedule
        </button>
      </div>
    </div>

    <div class="row">
      <!-- Calendar Sidebar -->
      <div class="col-md-3">
        <div class="card mb-4">
          <div class="card-header bg-white border-bottom">
            <h6 class="mb-0 fw-bold">{{ currentMonth }} {{ currentYear }}</h6>
          </div>
          <div class="card-body p-2">
            <div class="mini-calendar">
              <div
                class="calendar-header d-flex justify-content-between align-items-center mb-2 px-2"
              >
                <button
                  class="btn btn-sm btn-outline-secondary"
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
              <div class="calendar-grid">
                <div class="calendar-weekdays">
                  <div class="weekday" v-for="day in weekdays" :key="day">
                    {{ day }}
                  </div>
                </div>
                <div class="calendar-days">
                  <div
                    v-for="date in calendarDates"
                    :key="date.date"
                    :class="[
                      'calendar-day',
                      {
                        'other-month': date.otherMonth,
                        today: date.isToday,
                        selected: date.isSelected,
                        'has-events': date.hasEvents,
                      },
                    ]"
                    @click="selectDate(date)"
                  >
                    {{ date.day }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="card">
          <div class="card-header bg-white border-bottom">
            <h6 class="mb-0 fw-bold">Categories</h6>
          </div>
          <div class="card-body">
            <div class="category-item d-flex align-items-center mb-2">
              <div class="category-color bg-primary rounded me-2"></div>
              <span class="small">Technical Interview</span>
            </div>
            <div class="category-item d-flex align-items-center mb-2">
              <div class="category-color bg-success rounded me-2"></div>
              <span class="small">HR Interview</span>
            </div>
            <div class="category-item d-flex align-items-center mb-2">
              <div class="category-color bg-warning rounded me-2"></div>
              <span class="small">Final Interview</span>
            </div>
            <div class="category-item d-flex align-items-center">
              <div class="category-color bg-info rounded me-2"></div>
              <span class="small">Meeting</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Calendar -->
      <div class="col-md-9">
        <div class="card">
          <div class="card-header bg-white border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0 fw-bold">{{ currentMonth }} {{ currentYear }}</h5>
              <div class="btn-group">
                <button class="btn btn-outline-secondary btn-sm">Today</button>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-chevron-left"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="calendar-view">
              <!-- Calendar Header -->
              <div class="calendar-header-row d-flex border-bottom">
                <div
                  class="calendar-header-cell"
                  v-for="day in weekdays"
                  :key="day"
                >
                  {{ day }}
                </div>
              </div>

              <!-- Calendar Body -->
              <div class="calendar-body">
                <div
                  class="calendar-week d-flex"
                  v-for="week in calendarWeeks"
                  :key="week.id"
                >
                  <div
                    class="calendar-cell border-end border-bottom position-relative"
                    v-for="date in week.dates"
                    :key="date.date"
                  >
                    <div class="calendar-date p-2">
                      <span
                        :class="[
                          'date-number',
                          {
                            'text-muted': date.otherMonth,
                            'text-primary fw-bold': date.isToday,
                          },
                        ]"
                      >
                        {{ date.day }}
                      </span>
                    </div>

                    <!-- Events -->
                    <div class="calendar-events p-1">
                      <div
                        v-for="event in getEventsForDate(date.date)"
                        :key="event.id"
                        :class="[
                          'event-item',
                          'rounded',
                          'p-1',
                          'mb-1',
                          'small',
                          getEventClass(event.type),
                        ]"
                        @click="viewEvent(event)"
                      >
                        <div class="fw-semibold">{{ event.time }}</div>
                        <div class="text-truncate">{{ event.title }}</div>
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
</template>

<script>
import { useInterviewStore } from "@/stores/company/interviews";

export default {
  name: "MySchedule",
  data() {
    return {
      currentDate: new Date(),
      selectedDate: new Date(),
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  computed: {
    interviews() {
      const store = useInterviewStore();
      return store.interviews;
    },
    currentMonth() {
      return this.currentDate.toLocaleDateString("en-US", { month: "long" });
    },
    currentYear() {
      return this.currentDate.getFullYear();
    },
    currentDateRange() {
      const start = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      );
      const end = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      );
      return `${start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })} - ${end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`;
    },
    calendarDates() {
      const year = this.currentDate.getFullYear();
      const month = this.currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());

      const dates = [];
      const today = new Date();

      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        dates.push({
          date: date.toISOString().split("T")[0],
          day: date.getDate(),
          otherMonth: date.getMonth() !== month,
          isToday: date.toDateString() === today.toDateString(),
          isSelected: date.toDateString() === this.selectedDate.toDateString(),
          hasEvents:
            this.getEventsForDate(date.toISOString().split("T")[0]).length > 0,
        });
      }

      return dates;
    },
    calendarWeeks() {
      const weeks = [];
      const dates = this.calendarDates;

      for (let i = 0; i < dates.length; i += 7) {
        weeks.push({
          id: i / 7,
          dates: dates.slice(i, i + 7),
        });
      }

      return weeks;
    },
  },
  methods: {
    previousMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() - 1,
        1
      );
    },
    nextMonth() {
      this.currentDate = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        1
      );
    },
    selectDate(date) {
      this.selectedDate = new Date(date.date);
    },
    getEventsForDate(date) {
      return this.interviews.filter((event) => event.date === date);
    },
    getEventClass(type) {
      const classes = {
        technical: "bg-primary text-white",
        hr: "bg-success text-white",
        final: "bg-warning text-dark",
        meeting: "bg-info text-white",
      };
      return classes[type] || "bg-secondary text-white";
    },
    viewEvent(event) {
      // Handle event click
      console.log("View event:", event);
    },
  },
};
</script>

<style scoped>
.mini-calendar {
  font-size: 0.875rem;
}

.calendar-grid {
  width: 100%;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 4px;
}

.weekday {
  text-align: center;
  font-weight: 600;
  color: var(--text-gray);
  padding: 4px;
  font-size: 0.75rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
  font-size: 0.75rem;
}

.calendar-day:hover {
  background-color: var(--bg-secondary);
}

.calendar-day.other-month {
  color: var(--medium-gray);
}

.calendar-day.today {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

.calendar-day.selected {
  background-color: var(--bg-secondary);
  color: var(--primary-color);
}

.calendar-day.has-events {
  position: relative;
}

.calendar-day.has-events::after {
  content: "";
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  background-color: var(--secondary-color);
  border-radius: 50%;
}

.category-color {
  width: 12px;
  height: 12px;
}

.calendar-view {
  min-height: 600px;
}

.calendar-header-row {
  background-color: var(--bg-light);
}

.calendar-header-cell {
  flex: 1;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  color: var(--text-gray);
  border-bottom: 1px solid var(--light-gray);
}

.calendar-body {
  height: 500px;
}

.calendar-week {
  height: 20%;
}

.calendar-cell {
  flex: 1;
  min-height: 100px;
  background-color: white;
}

.calendar-cell:hover {
  background-color: var(--bg-light);
}

.date-number {
  font-size: 0.875rem;
}

.calendar-events {
  max-height: 70px;
  overflow-y: auto;
}

.event-item {
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
}

.event-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>

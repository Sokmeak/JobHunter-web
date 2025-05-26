<template>
  <div class="dashboard">
    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div class="flex-grow-1" style="margin-left: 280px">
        <!-- Top Header -->
        <TopHeader />

        <!-- Dashboard Content -->
        <div
          v-if="currentView === 'dashboard'"
          class="container-fluid p-4"
          style="background-color: #f8f9fa"
        >
          <!-- Header Text -->
          <div class="mb-4">
            <p class="text-muted mb-0">
              Here is your job listings statistic report from July 19 - July 25
            </p>
          </div>

          <!-- Stat Cards Row -->
          <div class="row g-4 mb-4">
            <!-- New Candidates Card -->
            <div class="col-lg-4">
              <div
                class="card border-0 text-white"
                style="
                  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                  min-height: 120px;
                "
              >
                <div
                  class="card-body d-flex justify-content-between align-items-center p-4"
                >
                  <div>
                    <h1 class="mb-2 fw-bold" style="font-size: 3rem">76</h1>
                    <p class="mb-0">New candidates to review</p>
                  </div>
                  <i class="bi bi-chevron-right fs-3"></i>
                </div>
              </div>
            </div>

            <!-- Schedule Card -->
            <div class="col-lg-4">
              <div
                class="card border-0 text-white"
                style="
                  background: linear-gradient(135deg, #10b981 0%, #34d399 100%);
                  min-height: 120px;
                "
              >
                <div
                  class="card-body d-flex justify-content-between align-items-center p-4"
                >
                  <div>
                    <h1 class="mb-2 fw-bold" style="font-size: 3rem">3</h1>
                    <p class="mb-0">Schedule for today</p>
                  </div>
                  <i class="bi bi-chevron-right fs-3"></i>
                </div>
              </div>
            </div>

            <!-- Messages Card -->
            <div class="col-lg-4">
              <div
                class="card border-0 text-white"
                style="
                  background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
                  min-height: 120px;
                "
              >
                <div
                  class="card-body d-flex justify-content-between align-items-center p-4"
                >
                  <div>
                    <h1 class="mb-2 fw-bold" style="font-size: 3rem">24</h1>
                    <p class="mb-0">Messages received</p>
                  </div>
                  <i class="bi bi-chevron-right fs-3"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <!-- Left Column - Job Statistics -->
            <div class="col-lg-8">
              <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                  <!-- Header -->
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <div>
                      <h5 class="mb-1 fw-bold">Job statistics</h5>
                      <p class="text-muted small mb-0">
                        Showing Jobstatistic Jul 19-25
                      </p>
                    </div>
                    <div class="btn-group" role="group">
                      <button
                        type="button"
                        class="btn btn-sm"
                        :class="
                          timePeriod === 'week'
                            ? 'btn-primary'
                            : 'btn-outline-secondary'
                        "
                        @click="timePeriod = 'week'"
                      >
                        Week
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm"
                        :class="
                          timePeriod === 'month'
                            ? 'btn-primary'
                            : 'btn-outline-secondary'
                        "
                        @click="timePeriod = 'month'"
                      >
                        Month
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm"
                        :class="
                          timePeriod === 'year'
                            ? 'btn-primary'
                            : 'btn-outline-secondary'
                        "
                        @click="timePeriod = 'year'"
                      >
                        Year
                      </button>
                    </div>
                  </div>

                  <!-- Tab Navigation -->
                  <ul class="nav nav-tabs border-0 mb-4">
                    <li class="nav-item">
                      <button
                        class="nav-link border-0 px-0 me-4 fw-medium"
                        :class="{
                          'active text-primary': activeTab === 'overview',
                        }"
                        @click="activeTab = 'overview'"
                        style="border-bottom: 3px solid transparent !important"
                        :style="
                          activeTab === 'overview'
                            ? 'border-bottom-color: #6366f1 !important;'
                            : ''
                        "
                      >
                        Overview
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        class="nav-link border-0 px-0 me-4 text-muted"
                        :class="{
                          'active text-primary': activeTab === 'jobs-view',
                        }"
                        @click="activeTab = 'jobs-view'"
                      >
                        Jobs View
                      </button>
                    </li>
                    <li class="nav-item">
                      <button
                        class="nav-link border-0 px-0 text-muted"
                        :class="{
                          'active text-primary': activeTab === 'jobs-applied',
                        }"
                        @click="activeTab = 'jobs-applied'"
                      >
                        Jobs Applied
                      </button>
                    </li>
                  </ul>

                  <!-- Animated Chart -->
                  <div
                    class="chart-container"
                    style="height: 300px; position: relative"
                  >
                    <div
                      class="d-flex align-items-end justify-content-between h-100 px-3"
                      style="padding-bottom: 40px"
                    >
                      <div
                        v-for="(day, index) in chartData"
                        :key="day.day"
                        class="chart-bar-container d-flex flex-column align-items-center"
                        style="flex: 1; max-width: 80px"
                      >
                        <!-- Bars Container -->
                        <div
                          class="d-flex align-items-end mb-2"
                          style="height: 200px; position: relative"
                        >
                          <!-- Job Applied Bar (Purple) -->
                          <div
                            class="chart-bar me-1 rounded-top"
                            :style="{
                              height: animatedHeights[index]?.applied + 'px',
                              backgroundColor: '#8b5cf6',
                              width: '20px',
                              transition: 'height 1s ease-in-out',
                              transitionDelay: index * 100 + 'ms',
                            }"
                          ></div>

                          <!-- Job View Bar (Orange) -->
                          <div
                            class="chart-bar rounded-top"
                            :style="{
                              height: animatedHeights[index]?.view + 'px',
                              backgroundColor: '#f59e0b',
                              width: '20px',
                              transition: 'height 1s ease-in-out',
                              transitionDelay: index * 100 + 50 + 'ms',
                            }"
                          ></div>

                          <!-- Data Labels -->
                          <div
                            v-if="index === 0"
                            class="position-absolute"
                            style="
                              top: -30px;
                              left: 0;
                              font-size: 12px;
                              font-weight: 600;
                            "
                          >
                            <div class="d-flex align-items-center mb-1">
                              <div
                                class="rounded me-1"
                                style="
                                  width: 8px;
                                  height: 8px;
                                  background-color: #10b981;
                                "
                              ></div>
                              <span style="color: #10b981">122</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <div
                                class="rounded me-1"
                                style="
                                  width: 8px;
                                  height: 8px;
                                  background-color: #3b82f6;
                                "
                              ></div>
                              <span style="color: #3b82f6">34</span>
                            </div>
                          </div>
                        </div>

                        <!-- Day Label -->
                        <div class="text-muted small">{{ day.day }}</div>
                      </div>
                    </div>

                    <!-- Chart Legend -->
                    <div class="d-flex justify-content-start mt-3">
                      <div class="d-flex align-items-center me-4">
                        <div
                          class="rounded me-2"
                          style="
                            width: 12px;
                            height: 12px;
                            background-color: #f59e0b;
                          "
                        ></div>
                        <span class="small text-muted">Job View</span>
                      </div>
                      <div class="d-flex align-items-center">
                        <div
                          class="rounded me-2"
                          style="
                            width: 12px;
                            height: 12px;
                            background-color: #8b5cf6;
                          "
                        ></div>
                        <span class="small text-muted">Job Applied</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="col-lg-4">
              <!-- Job Open -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4 text-center">
                  <h6 class="mb-3 text-start fw-bold">Job Open</h6>
                  <h1
                    class="display-1 fw-bold mb-2"
                    style="font-size: 4rem; line-height: 1"
                  >
                    12
                  </h1>
                  <p class="text-muted mb-0">Jobs Opened</p>
                </div>
              </div>

              <!-- Job Views -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <div
                    class="d-flex justify-content-between align-items-start mb-3"
                  >
                    <h6 class="mb-0 fw-bold">Job Views</h6>
                    <div
                      class="bg-warning rounded-circle p-2"
                      style="
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <i class="bi bi-eye text-white"></i>
                    </div>
                  </div>
                  <h2 class="mb-2 fw-bold" style="font-size: 2.5rem">2,342</h2>
                  <div class="d-flex align-items-center">
                    <span class="text-success small me-1">
                      <i class="bi bi-triangle-fill" style="font-size: 8px"></i>
                      6.4%
                    </span>
                    <span class="text-muted small">This Week</span>
                  </div>
                </div>
              </div>

              <!-- Job Applied -->
              <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-4">
                  <div
                    class="d-flex justify-content-between align-items-start mb-3"
                  >
                    <h6 class="mb-0 fw-bold">Job Applied</h6>
                    <div
                      class="bg-primary rounded-circle p-2"
                      style="
                        width: 40px;
                        height: 40px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                      "
                    >
                      <i class="bi bi-file-earmark text-white"></i>
                    </div>
                  </div>
                  <h2 class="mb-2 fw-bold" style="font-size: 2.5rem">654</h2>
                  <div class="d-flex align-items-center">
                    <span class="text-danger small me-1">
                      <i
                        class="bi bi-triangle-fill"
                        style="font-size: 8px; transform: rotate(180deg)"
                      ></i>
                      0.5%
                    </span>
                    <span class="text-muted small">This Week</span>
                  </div>
                </div>
              </div>

              <!-- Applicants Summary -->
              <div class="card border-0 shadow-sm">
                <div class="card-body p-4">
                  <h6 class="mb-3 fw-bold">Applicants Summary</h6>
                  <div class="text-center mb-4">
                    <h1
                      class="display-1 fw-bold mb-2"
                      style="font-size: 4rem; line-height: 1"
                    >
                      67
                    </h1>
                    <p class="text-muted mb-0">Applicants</p>
                  </div>

                  <!-- Progress Bar -->
                  <div class="progress mb-3" style="height: 8px">
                    <div
                      class="progress-bar"
                      style="width: 30%; background-color: #8b5cf6"
                    ></div>
                    <div
                      class="progress-bar"
                      style="width: 16%; background-color: #10b981"
                    ></div>
                    <div
                      class="progress-bar"
                      style="width: 15%; background-color: #3b82f6"
                    ></div>
                    <div
                      class="progress-bar"
                      style="width: 21%; background-color: #f59e0b"
                    ></div>
                    <div
                      class="progress-bar"
                      style="width: 18%; background-color: #ef4444"
                    ></div>
                  </div>

                  <!-- Legend -->
                  <div class="row g-2 small">
                    <div class="col-6">
                      <div
                        class="d-flex align-items-center justify-content-between mb-2"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded me-2"
                            style="
                              width: 8px;
                              height: 8px;
                              background-color: #8b5cf6;
                            "
                          ></div>
                          <span class="text-muted">Full Time</span>
                        </div>
                        <span class="fw-medium">45</span>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between mb-2"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded me-2"
                            style="
                              width: 8px;
                              height: 8px;
                              background-color: #10b981;
                            "
                          ></div>
                          <span class="text-muted">Part-Time</span>
                        </div>
                        <span class="fw-medium">24</span>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded me-2"
                            style="
                              width: 8px;
                              height: 8px;
                              background-color: #3b82f6;
                            "
                          ></div>
                          <span class="text-muted">Remote</span>
                        </div>
                        <span class="fw-medium">22</span>
                      </div>
                    </div>
                    <div class="col-6">
                      <div
                        class="d-flex align-items-center justify-content-between mb-2"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded me-2"
                            style="
                              width: 8px;
                              height: 8px;
                              background-color: #f59e0b;
                            "
                          ></div>
                          <span class="text-muted">Internship</span>
                        </div>
                        <span class="fw-medium">32</span>
                      </div>
                      <div
                        class="d-flex align-items-center justify-content-between"
                      >
                        <div class="d-flex align-items-center">
                          <div
                            class="rounded me-2"
                            style="
                              width: 8px;
                              height: 8px;
                              background-color: #ef4444;
                            "
                          ></div>
                          <span class="text-muted">Contract</span>
                        </div>
                        <span class="fw-medium">30</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Updates Section -->
          <div class="mt-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="mb-0 fw-bold">Job Updates</h5>
              <button
                class="btn btn-link text-primary p-0 d-flex align-items-center fw-medium"
                @click="viewAllJobs"
              >
                View All
                <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>

            <div class="row g-4">
              <div
                class="col-lg-3 col-md-6"
                v-for="job in jobUpdates"
                :key="job.id"
              >
                <div class="card border-0 shadow-sm h-100">
                  <div class="card-body p-4">
                    <!-- Company Logo and Badge -->
                    <div
                      class="d-flex justify-content-between align-items-start mb-3"
                    >
                      <div
                        class="company-logo rounded-3 p-3 d-flex align-items-center justify-content-center"
                        :style="{
                          backgroundColor: job.logoColor,
                          width: '60px',
                          height: '60px',
                        }"
                      >
                        <i :class="job.logoIcon" class="text-white fs-4"></i>
                      </div>
                      <span
                        class="badge bg-success-subtle text-success px-3 py-2 border border-success"
                        >{{ job.type }}</span
                      >
                    </div>

                    <!-- Job Title -->
                    <h6 class="mb-2 fw-bold">{{ job.title }}</h6>

                    <!-- Company and Location -->
                    <div
                      class="d-flex align-items-center text-muted small mb-3"
                    >
                      <span>{{ job.company }}</span>
                      <span class="mx-2">•</span>
                      <span>{{ job.location }}</span>
                    </div>

                    <!-- Tags -->
                    <div class="d-flex flex-wrap gap-2 mb-3">
                      <span
                        v-for="tag in job.tags"
                        :key="tag"
                        class="badge px-3 py-2"
                        :class="getTagClass(tag)"
                      >
                        {{ tag }}
                      </span>
                    </div>

                    <!-- Application Progress -->
                    <div class="mt-auto">
                      <div
                        class="d-flex justify-content-between align-items-center mb-2"
                      >
                        <span class="small fw-medium"
                          >{{ job.applied }} applied</span
                        >
                        <span class="small text-muted"
                          >of {{ job.capacity }} capacity</span
                        >
                      </div>
                      <div class="progress" style="height: 6px">
                        <div
                          class="progress-bar bg-success"
                          :style="{
                            width: (job.applied / job.capacity) * 100 + '%',
                          }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Views -->
        <div
          v-else-if="currentView === 'company-profile'"
          class="container-fluid p-4"
        >
          <CompanyProfile />
        </div>

        <div
          v-else-if="currentView === 'all-applicants'"
          class="container-fluid p-4"
        >
          <ApplicantsTable />
        </div>

        <div
          v-else-if="currentView === 'applicant-details'"
          class="container-fluid p-4"
        >
          <ApplicantDetails />
        </div>

        <div
          v-else-if="currentView === 'job-listing'"
          class="container-fluid p-4"
        >
          <JobListing />
        </div>

        <div
          v-else-if="currentView === 'my-schedule'"
          class="container-fluid p-4"
        >
          <MySchedule />
        </div>

        <div v-else-if="currentView === 'post-job'" class="container-fluid p-4">
          <PostJobForm />
        </div>

        <div v-else-if="currentView === 'settings'" class="container-fluid p-4">
          <SettingsPage />
        </div>

        <div
          v-else-if="currentView === 'help-center'"
          class="container-fluid p-4"
        >
          <HelpCenter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch } from "vue";
import Sidebar from "@/components/company/Sidebar.vue";
import TopHeader from "@/components/company/TopHeader.vue";
import CompanyProfile from "@/components/company/CompanyProfile.vue";
import ApplicantsTable from "@/components/company/ApplicantsTable.vue";
import ApplicantDetails from "@/components/company/ApplicantDetails.vue";
import JobListing from "@/components/company/JobListing.vue";
import PostJobForm from "@/components/company/PostJobForm.vue";
import SettingsPage from "@/components/company/SettingsPage.vue";
import MySchedule from "@/components/company/MySchedule.vue";
import HelpCenter from "@/components/company/HelpCenter.vue";

const currentView = ref("dashboard");
const timePeriod = ref("week");
const activeTab = ref("overview");
const animatedHeights = ref([]);

const chartData = ref([
  { day: "Mon", jobView: 122, jobApplied: 34 },
  { day: "Tue", jobView: 89, jobApplied: 45 },
  { day: "Wed", jobView: 156, jobApplied: 28 },
  { day: "Thu", jobView: 134, jobApplied: 67 },
  { day: "Fri", jobView: 178, jobApplied: 89 },
  { day: "Sat", jobView: 98, jobApplied: 23 },
  { day: "Sun", jobView: 112, jobApplied: 45 },
]);

const jobUpdates = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#10b981",
    logoIcon: "bi bi-hash",
    tags: ["Marketing", "Design"],
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#3b82f6",
    logoIcon: "bi bi-dropbox",
    tags: ["Business", "Design"],
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    location: "Berlin, Germany",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#06b6d4",
    logoIcon: "bi bi-layers",
    tags: ["Marketing", "Design"],
  },
  {
    id: 4,
    title: "Product Designer",
    company: "ClassPass",
    location: "Berlin, Germany",
    type: "Full-Time",
    applied: 5,
    capacity: 10,
    logoColor: "#8b5cf6",
    logoIcon: "bi bi-circle",
    tags: ["Business", "Design"],
  },
]);

const maxValue = 200;

const calculateHeight = (value) => {
  return (value / maxValue) * 180;
};

const animateChart = () => {
  animatedHeights.value = chartData.value.map(() => ({ view: 0, applied: 0 }));

  setTimeout(() => {
    animatedHeights.value = chartData.value.map((day) => ({
      view: calculateHeight(day.jobView),
      applied: calculateHeight(day.jobApplied),
    }));
  }, 100);
};

const getTagClass = (tag) => {
  switch (tag.toLowerCase()) {
    case "marketing":
      return "bg-warning-subtle text-warning border border-warning";
    case "design":
      return "bg-primary-subtle text-primary border border-primary";
    case "business":
      return "bg-success-subtle text-success border border-success";
    default:
      return "bg-secondary-subtle text-secondary border border-secondary";
  }
};

const navigate = (view) => {
  currentView.value = view;
  console.log("Navigating to:", view);
};

const viewApplicantDetails = (applicantId) => {
  console.log("Viewing applicant details for:", applicantId);
  currentView.value = "applicant-details";
};

const goBack = () => {
  currentView.value = "dashboard";
};

const viewAllJobs = () => {
  navigate("job-listing");
};

onMounted(() => {
  animateChart();
});

watch(timePeriod, () => {
  animateChart();
});

watch(activeTab, () => {
  animateChart();
});

// Provide navigation functions and current view to child components
provide("navigate", navigate);
provide("viewApplicantDetails", viewApplicantDetails);
provide("goBack", goBack);
provide("currentView", currentView);
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.chart-bar {
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.chart-bar:hover {
  opacity: 0.8;
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.btn-group .btn {
  border-radius: 0;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.nav-link.active {
  font-weight: 600;
}

.progress-bar {
  transition: width 1s ease-in-out;
}
</style>

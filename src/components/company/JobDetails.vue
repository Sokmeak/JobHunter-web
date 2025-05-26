<template>
  <div class="job-details">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-secondary me-3" @click="goBack">
          <i class="bi bi-arrow-left"></i>
        </button>
        <div>
          <h4 class="mb-0">{{ jobData.title }}</h4>
          <p class="text-muted mb-0">
            {{ jobData.department }} • {{ jobData.type }} •
            {{ jobData.hired }} / {{ jobData.capacity }} Hired
          </p>
        </div>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-outline-primary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-chevron-down me-1"></i>More Action
        </button>
        <ul class="dropdown-menu">
          <li>
            <a class="dropdown-item" href="#" @click="editJob">Edit Job</a>
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="duplicateJob"
              >Duplicate Job</a
            >
          </li>
          <li>
            <a class="dropdown-item" href="#" @click="closeJob">Close Job</a>
          </li>
          <li><hr class="dropdown-divider" /></li>
          <li>
            <a class="dropdown-item text-danger" href="#" @click="deleteJob"
              >Delete Job</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="card border-0 shadow-sm">
      <div class="card-header bg-white">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'applicants' }"
              @click="setActiveTab('applicants')"
            >
              Applicants
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'job-details' }"
              @click="setActiveTab('job-details')"
            >
              Job Details
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'analytics' }"
              @click="setActiveTab('analytics')"
            >
              Analytics
            </button>
          </li>
          <li class="nav-item">
            <button
              class="nav-link"
              :class="{ active: activeTab === 'settings' }"
              @click="setActiveTab('settings')"
            >
              Settings
            </button>
          </li>
        </ul>
      </div>

      <div class="card-body">
        <!-- Job Details Tab -->
        <div v-if="activeTab === 'job-details'">
          <div class="row">
            <div class="col-lg-8">
              <div class="d-flex align-items-center mb-4">
                <div
                  class="bg-primary rounded-3 p-3 me-3"
                  style="width: 60px; height: 60px"
                >
                  <span class="text-white fw-bold fs-4">S</span>
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1">{{ jobData.title }}</h5>
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="editJobDetails"
                  >
                    <i class="bi bi-pencil me-1"></i>Edit Job Details
                  </button>
                </div>
              </div>

              <div class="mb-4">
                <h6 class="mb-3">Description</h6>
                <p class="text-muted">{{ jobData.description }}</p>
              </div>

              <div class="mb-4">
                <h6 class="mb-3">Responsibilities</h6>
                <ul class="list-unstyled">
                  <li
                    v-for="responsibility in jobData.responsibilities"
                    :key="responsibility"
                    class="d-flex align-items-start mb-2"
                  >
                    <i
                      class="bi bi-check-circle-fill text-success me-2 mt-1"
                    ></i>
                    <span>{{ responsibility }}</span>
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h6 class="mb-3">Who You Are</h6>
                <ul class="list-unstyled">
                  <li
                    v-for="requirement in jobData.requirements"
                    :key="requirement"
                    class="d-flex align-items-start mb-2"
                  >
                    <i
                      class="bi bi-check-circle-fill text-success me-2 mt-1"
                    ></i>
                    <span>{{ requirement }}</span>
                  </li>
                </ul>
              </div>

              <div class="mb-4">
                <h6 class="mb-3">Nice-To-Haves</h6>
                <ul class="list-unstyled">
                  <li
                    v-for="niceToHave in jobData.niceToHaves"
                    :key="niceToHave"
                    class="d-flex align-items-start mb-2"
                  >
                    <i
                      class="bi bi-check-circle-fill text-success me-2 mt-1"
                    ></i>
                    <span>{{ niceToHave }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="card border">
                <div class="card-body">
                  <h6 class="mb-3">About this role</h6>

                  <div class="mb-3">
                    <div
                      class="d-flex justify-content-between align-items-center mb-1"
                    >
                      <span class="fw-medium"
                        >{{ jobData.applied }} applied</span
                      >
                      <span class="text-muted"
                        >of {{ jobData.capacity }} capacity</span
                      >
                    </div>
                    <div class="progress" style="height: 6px">
                      <div
                        class="progress-bar bg-primary"
                        :style="{
                          width:
                            (jobData.applied / jobData.capacity) * 100 + '%',
                        }"
                      ></div>
                    </div>
                  </div>

                  <div class="row g-3 mb-3">
                    <div class="col-6">
                      <small class="text-muted">Apply Before</small>
                      <div class="fw-medium">{{ jobData.applyBefore }}</div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Job Posted On</small>
                      <div class="fw-medium">{{ jobData.postedOn }}</div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Job Type</small>
                      <div class="fw-medium">{{ jobData.type }}</div>
                    </div>
                    <div class="col-6">
                      <small class="text-muted">Salary</small>
                      <div class="fw-medium">{{ jobData.salary }}</div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <h6 class="mb-2">Categories</h6>
                    <div>
                      <span
                        v-for="category in jobData.categories"
                        :key="category.name"
                        :class="getCategoryClass(category.type)"
                        class="badge me-1"
                      >
                        {{ category.name }}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h6 class="mb-2">Required Skills</h6>
                    <div>
                      <span
                        v-for="skill in jobData.skills"
                        :key="skill"
                        class="badge bg-primary-subtle text-primary me-1 mb-1"
                      >
                        {{ skill }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Analytics Tab -->
        <div v-if="activeTab === 'analytics'">
          <div class="row g-4 mb-4">
            <div class="col-md-6">
              <div class="card border h-100">
                <div class="card-body text-center">
                  <div
                    class="d-flex align-items-center justify-content-center mb-2"
                  >
                    <div class="bg-info rounded-circle p-2 me-2">
                      <i class="bi bi-eye text-white"></i>
                    </div>
                    <h6 class="mb-0">Total Views</h6>
                  </div>
                  <h2 class="mb-1">23,564</h2>
                  <small class="text-success">
                    <i class="bi bi-arrow-up"></i>6.4% vs last day
                  </small>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card border h-100">
                <div class="card-body text-center">
                  <div
                    class="d-flex align-items-center justify-content-center mb-2"
                  >
                    <div class="bg-primary rounded-circle p-2 me-2">
                      <i class="bi bi-person-plus text-white"></i>
                    </div>
                    <h6 class="mb-0">Total Applied</h6>
                  </div>
                  <h2 class="mb-1">132</h2>
                  <small class="text-danger">
                    <i class="bi bi-arrow-down"></i>0.4% vs last day
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-8">
              <div class="card border">
                <div
                  class="card-header bg-white d-flex justify-content-between align-items-center"
                >
                  <h6 class="mb-0">Job Listing View stats</h6>
                  <select
                    class="form-select form-select-sm"
                    style="width: auto"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div class="card-body">
                  <div
                    class="analytics-chart"
                    style="
                      height: 300px;
                      background: linear-gradient(
                          45deg,
                          #f8f9fa 25%,
                          transparent 25%
                        ),
                        linear-gradient(-45deg, #f8f9fa 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, #f8f9fa 75%),
                        linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
                      background-size: 20px 20px;
                      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
                      position: relative;
                    "
                  >
                    <div
                      class="d-flex align-items-center justify-content-center h-100"
                    >
                      <div class="text-center">
                        <i
                          class="bi bi-bar-chart text-muted"
                          style="font-size: 3rem"
                        ></i>
                        <p class="text-muted mt-2">
                          Analytics chart would be rendered here
                        </p>
                        <small class="text-muted"
                          >Integration with Chart.js or similar library
                          needed</small
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card border mb-4">
                <div class="card-header bg-white">
                  <h6 class="mb-0">Traffic channel</h6>
                </div>
                <div class="card-body">
                  <div class="traffic-chart mb-3" style="height: 200px">
                    <div
                      class="d-flex align-items-center justify-content-center h-100"
                    >
                      <div class="text-center">
                        <i
                          class="bi bi-pie-chart text-muted"
                          style="font-size: 2rem"
                        ></i>
                        <p class="text-muted small mt-2">
                          Donut chart placeholder
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="traffic-legend">
                    <div
                      class="d-flex justify-content-between align-items-center mb-1"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          class="bg-warning rounded-circle me-2"
                          style="width: 8px; height: 8px"
                        ></div>
                        <small>Direct</small>
                      </div>
                      <small class="fw-medium">48%</small>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center mb-1"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          class="bg-info rounded-circle me-2"
                          style="width: 8px; height: 8px"
                        ></div>
                        <small>Social</small>
                      </div>
                      <small class="fw-medium">23%</small>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center mb-1"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          class="bg-primary rounded-circle me-2"
                          style="width: 8px; height: 8px"
                        ></div>
                        <small>Organic</small>
                      </div>
                      <small class="fw-medium">24%</small>
                    </div>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="d-flex align-items-center">
                        <div
                          class="bg-success rounded-circle me-2"
                          style="width: 8px; height: 8px"
                        ></div>
                        <small>Other</small>
                      </div>
                      <small class="fw-medium">5%</small>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card border">
                <div class="card-header bg-white">
                  <h6 class="mb-0">Visitors by country</h6>
                </div>
                <div class="card-body">
                  <div
                    v-for="country in visitorsByCountry"
                    :key="country.name"
                    class="d-flex justify-content-between align-items-center mb-2"
                  >
                    <div class="d-flex align-items-center">
                      <img
                        :src="country.flag"
                        class="me-2"
                        style="width: 20px; height: 14px"
                        :alt="country.name"
                      />
                      <span class="small">{{ country.name }}</span>
                    </div>
                    <span class="small fw-medium">{{
                      country.visitors.toLocaleString()
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Applicants Tab -->
        <div v-if="activeTab === 'applicants'">
          <ApplicantsTable :jobId="jobData.id" />
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="text-center py-5">
          <i class="bi bi-gear text-muted" style="font-size: 3rem"></i>
          <h6 class="mt-3">Job Settings</h6>
          <p class="text-muted">
            Configure job-specific settings and preferences
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ApplicantsTable from "./ApplicantsTable.vue";

const props = defineProps({
  jobId: {
    type: String,
    required: true,
  },
});

const activeTab = ref("job-details");

const jobData = ref({
  id: "1",
  title: "Social Media Assistant",
  department: "Design",
  type: "Full-Time",
  hired: 4,
  capacity: 11,
  applied: 5,
  applyBefore: "July 31, 2021",
  postedOn: "July 1, 2021",
  salary: "$75k-$85k USD",
  description:
    "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
  responsibilities: [
    "Community engagement to ensure that is supported and actively represented online",
    "Focus on social media content development and publication",
    "Marketing and strategy support",
    "Stay on top of trends on social media platforms, and suggest content ideas to the team",
    "Engage with online communities",
  ],
  requirements: [
    "You get energy from people and building the ideal work environment",
    "You have a sense for beautiful spaces and office experiences",
    "You are a confident office manager, ready for added responsibilities",
    "You're detail-oriented and creative",
    "You're a growth marketer and know how to run campaigns",
  ],
  niceToHaves: [
    "Fluent in English",
    "Project management skills",
    "Copy editing skills",
  ],
  categories: [
    { name: "Marketing", type: "warning" },
    { name: "Design", type: "info" },
  ],
  skills: [
    "Project Management",
    "Copywriting",
    "Social Media Marketing",
    "English",
    "Copy Editing",
  ],
});

const visitorsByCountry = ref([
  {
    name: "USA",
    flag: "/placeholder.svg?height=14&width=20&query=USA flag",
    visitors: 3240,
  },
  {
    name: "France",
    flag: "/placeholder.svg?height=14&width=20&query=France flag",
    visitors: 3188,
  },
  {
    name: "Italy",
    flag: "/placeholder.svg?height=14&width=20&query=Italy flag",
    visitors: 2938,
  },
  {
    name: "Germany",
    flag: "/placeholder.svg?height=14&width=20&query=Germany flag",
    visitors: 2624,
  },
  {
    name: "Japan",
    flag: "/placeholder.svg?height=14&width=20&query=Japan flag",
    visitors: 2414,
  },
  {
    name: "Netherlands",
    flag: "/placeholder.svg?height=14&width=20&query=Netherlands flag",
    visitors: 1906,
  },
]);

const setActiveTab = (tab) => {
  activeTab.value = tab;
  console.log("Active tab changed to:", tab);
};

const getCategoryClass = (type) => {
  const classes = {
    warning: "bg-warning-subtle text-warning",
    info: "bg-info-subtle text-info",
    primary: "bg-primary-subtle text-primary",
    success: "bg-success-subtle text-success",
  };
  return classes[type] || "bg-secondary-subtle text-secondary";
};

const goBack = () => {
  console.log("Going back to job listing");
};

const editJob = () => {
  console.log("Editing job:", props.jobId);
};

const duplicateJob = () => {
  console.log("Duplicating job:", props.jobId);
};

const closeJob = () => {
  console.log("Closing job:", props.jobId);
};

const deleteJob = () => {
  console.log("Deleting job:", props.jobId);
};

const editJobDetails = () => {
  console.log("Editing job details");
};
</script>

<style scoped>
.analytics-chart {
  border: 1px dashed #dee2e6;
  border-radius: 0.375rem;
}

.traffic-chart {
  border: 1px dashed #dee2e6;
  border-radius: 0.375rem;
}
</style>

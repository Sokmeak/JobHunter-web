<template>
  <div class="container py-4">
    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-2"></nav>

    <!-- Job Header Section -->
    <div class="job-header bg-white rounded-4 p-4 shadow-sm mb-4">
      <div class="row align-items-center">
        <div class="col-md-8 d-flex align-items-center">
          <div
            class="company-logo rounded-3 d-flex align-items-center justify-content-center me-4"
          >
            <img
              :src="companyLogo"
              :alt="`${currentJob.company} logo`"
              class="img-fluid rounded-3"
              width="60"
              height="60"
            />
          </div>
          <div>
            <h1 class="fs-3 fw-bold mb-1">{{ currentJob.title }}</h1>
            <div class="d-flex flex-wrap align-items-center text-muted">
              <span>{{ currentJob.company }}</span>
              <span class="mx-2">•</span>
              <span>{{ currentJob.location }}</span>
              <span class="mx-2">•</span>
              <span>{{ currentJob.type }}</span>
            </div>
          </div>
        </div>
        <div
          class="col-md-4 text-md-end mt-3 mt-md-0 d-flex align-items-center justify-content-md-end"
        >
          <button
            class="btn btn-outline-secondary me-3 d-flex align-items-center"
            title="Share job"
          >
            <i class="bi bi-share me-2"></i>
            <span class="d-none d-sm-inline">Share</span>
          </button>
          <button
            class="btn btn-primary px-4 py-2 position-relative overflow-hidden"
            @click="showApplicationModal"
            @mousedown="addRippleEffect"
          >
            <span
              class="ripple-effect"
              v-if="rippleActive"
              :style="rippleStyle"
            ></span>
            <span class="position-relative">Apply Now</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Left Column - Job Details -->
      <div class="col-lg-8">
        <!-- Description Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Description</h2>
          <p class="text-muted mb-0">{{ currentJob.description }}</p>
        </div>

        <!-- Responsibilities Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Responsibilities</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(responsibility, index) in currentJob.responsibilities"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ responsibility }}</span>
            </li>
          </ul>
        </div>

        <!-- Who You Are Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Who You Are</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(trait, index) in currentJob.whoYouAre"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ trait }}</span>
            </li>
          </ul>
        </div>

        <!-- Nice-To-Haves Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Nice-To-Haves</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(skill, index) in currentJob.niceToHaves"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ skill }}</span>
            </li>
          </ul>
        </div>

        <!-- Perks & Benefits Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Perks & Benefits</h2>
          <p class="text-muted mb-4">
            This job comes with several perks and benefits
          </p>
          <div class="row g-4">
            <div
              v-for="(benefit, index) in currentJob.benefits"
              :key="index"
              class="col-md-6"
            >
              <div class="d-flex">
                <div
                  class="benefit-icon rounded-circle p-3 text-primary me-3 d-flex align-items-center justify-content-center"
                >
                  <i :class="`bi ${benefit.icon}`"></i>
                </div>
                <div>
                  <h3 class="fs-6 fw-bold mb-1">{{ benefit.title }}</h3>
                  <p class="text-muted small mb-0">{{ benefit.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <div class="d-flex align-items-center mb-3">
            <div
              class="company-logo-sm rounded-3 d-flex align-items-center justify-content-center me-3 bg-secondary text-primary"
            >
              <span class="fw-bold">{{ currentJob.company }}</span>
            </div>
            <h2 class="fs-5 fw-bold mb-0">{{ currentJob.company }}</h2>
          </div>
          <p class="text-muted mb-3">
            <RouterLink
              :to="`/company/${currentJob.companyId}`"
              class="text-decoration-none"
            >
              Read more about {{ currentJob.company }}
            </RouterLink>
          </p>
          <p class="text-muted mb-4">
            {{ currentJob.company }} is a technology company that builds
            innovative solutions. Businesses of every size—from startups to
            global enterprises—use our software to enhance their operations and
            achieve their goals.
          </p>
          <div class="row g-3">
            <div class="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Office"
                class="img-fluid rounded-3 shadow-sm"
              />
            </div>
            <div class="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                alt="Team"
                class="img-fluid rounded-3 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Job Meta -->
      <div class="col-lg-4">
        <!-- Job Meta Info -->
        <div
          class="bg-white rounded-4 p-4 shadow-sm mb-4 sticky-lg-top"
          style="top: 20px; z-index: 100"
        >
          <h2 class="fs-5 fw-bold mb-3">About this role</h2>
          <div
            class="applied-section bg-success-subtle text-success rounded-3 p-3 d-flex align-items-center justify-content-between mb-4"
          >
            <span class="fw-medium"
              ><i class="bi bi-people-fill me-2"></i
              >{{ currentJob.applied }} applied</span
            >
            <span class="badge bg-success rounded-pill">
              {{
                currentJob.applied / currentJob.capacity <= 0.5
                  ? "Low competition"
                  : "High competition"
              }}
            </span>
          </div>

          <div class="job-meta">
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-calendar-event me-2"></i>Apply Before</span
              >
              <span class="fw-medium">{{
                formatDate(currentJob.deadline)
              }}</span>
            </div>
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-calendar-check me-2"></i>Job Posted On</span
              >
              <span class="fw-medium">{{
                formatDate(currentJob.postedDate)
              }}</span>
            </div>
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-briefcase me-2"></i>Job Type</span
              >
              <span class="fw-medium">{{ currentJob.type }}</span>
            </div>
            <div class="d-flex justify-content-between py-3">
              <span class="text-muted"
                ><i class="bi bi-cash-coin me-2"></i>Salary</span
              >
              <span class="fw-medium">{{ currentJob.salary }}</span>
            </div>
          </div>

          <button
            class="btn btn-primary w-100 rounded-pill mt-4 py-2 position-relative overflow-hidden"
            @click="showApplicationModal"
            @mousedown="addRippleEffect"
          >
            <span
              class="ripple-effect"
              v-if="rippleActive"
              :style="rippleStyle"
            ></span>
            <span class="position-relative">Apply for this position</span>
          </button>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Categories</h2>
          <div class="d-flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in currentJob.tags"
              :key="index"
              :class="[
                'badge rounded-pill px-3 py-2',
                index === 0
                  ? 'bg-warning-subtle text-warning'
                  : 'bg-primary-subtle text-primary',
              ]"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Required Skills -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Required Skills</h2>
          <div class="d-flex flex-wrap gap-2">
            <span
              v-for="(skill, index) in requiredSkills"
              :key="index"
              class="badge bg-light text-dark rounded-pill px-3 py-2"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Jobs Section -->
    <div class="similar-jobs mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold mb-0">Similar Jobs</h2>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-2 scroll-btn scroll-left"
            aria-label="Scroll left"
            @click="scrollJobsLeft"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-3 scroll-btn scroll-right"
            aria-label="Scroll right"
            @click="scrollJobsRight"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
          <RouterLink
            to="/jobs"
            class="text-primary text-decoration-none d-flex align-items-center"
          >
            Show all jobs
            <i class="bi bi-arrow-right ms-1"></i>
          </RouterLink>
        </div>
      </div>

      <div class="position-relative">
        <div class="jobs-scroll-container" ref="jobsContainer">
          <div class="d-flex flex-nowrap">
            <div
              class="job-card-wrapper"
              v-for="job in similarJobs"
              :key="job.id"
            >
              <JobCard :job="job" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Application Modal -->
    <JobApplicationModal
      :is-visible="isModalVisible"
      :job="currentJob"
      :form-subtitle="`The following is required and will only be shared with ${currentJob.company}`"
      @close="hideApplicationModal"
      @submit-success="handleApplicationSuccess"
      @submit-error="handleApplicationError"
      @view-status="viewApplicationStatus"
    />

    <SimpleStatusModal
      :is-visible="showStatusModal"
      :is-loading="isLoadingStatus"
      :status="applicationStatus"
      :application-id="currentApplicationId"
      :error-message="errorMessage"
      @close="closeStatusModal"
      @retry="retryApplication"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useJobStore } from "@/stores/jobStore";
import { useCompanyStore } from "@/stores/companyStore";
import JobCard from "@/components/findjob/JobCard.vue";
import SimpleStatusModal from "@/components/job-description/SimpleStatusModal.vue";
import JobApplicationModal from "@/components/job-description/JobApplicationModel.vue";
import { getApplicationStatus } from "@/components/services/applicationService";
import {
  showSuccessToast,
  showErrorToast,
} from "@/components/services/toastService";

// State
const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const companyStore = useCompanyStore();
const isModalVisible = ref(false);
const rippleActive = ref(false);
const rippleStyle = reactive({ left: "0px", top: "0px" });
const isLoading = ref(true);
const applicationStatus = ref("loading");
const errorMessage = ref("");
const showStatusModal = ref(false);
const isLoadingStatus = ref(false);
const currentApplicationId = ref("");

// Company data
const companyName = computed(() => {
  const company = companyStore.getCompanyById(Number(currentJob.companyId));
  return company?.name || currentJob.company || "Unknown Company";
});

const companyLogo = computed(() => {
  const company = companyStore.getCompanyById(Number(currentJob.companyId));
  return (
    company?.logo ||
    currentJob.companyLogo ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png"
  );
});

// Reactive job data
const currentJob = reactive({
  id: "",
  title: "",
  companyId: "",
  company: "",
  location: "",
  type: "",
  companyLogo: "",
  description: "",
  salary: "",
  postedDate: "",
  deadline: "",
  applied: 0,
  capacity: 0,
  tags: [],
  responsibilities: [],
  whoYouAre: [],
  niceToHaves: [],
  benefits: [],
});

// Computed required skills
const requiredSkills = ref([]);

// Similar jobs
const similarJobs = ref([]);

// Scroll methods for similar jobs
const jobsContainer = ref(null);

const scrollJobsRight = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

const scrollJobsLeft = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
};

// Fetch all jobs
const fetchData = async () => {
  try {
    await Promise.all([jobStore.fetchJobs(), companyStore.fetchCompanies()]);
  } catch (error) {
    console.error("Error fetching data:", error);
    showErrorToast("Failed to load data. Please try again.");
  }
};

// Fetch job data
const fetchJobData = async (jobId) => {
  isLoading.value = true;
  try {
    const jobData = await jobStore.getJobById(Number(jobId));
    if (jobData) {
      Object.assign(currentJob, {
        id: jobData.id || "",
        title: jobData.title || "",
        companyId: jobData.companyId || "",
        company: jobData.company || "",
        location: jobData.location || "",
        type: jobData.type || "",
        companyLogo: jobData.companyLogo || "",
        description: jobData.description || "",
        salary: jobData.salary || "",
        postedDate: jobData.postedDate || "",
        deadline: jobData.deadline || "",
        applied: jobData.applied || 0,
        capacity: jobData.capacity || 0,
        tags: jobData.tags || [],
        responsibilities: jobData.responsibilities || [],
        whoYouAre: jobData.whoYouAre || [],
        niceToHaves: jobData.niceToHaves || [],
        benefits: jobData.benefits || [],
      });
      requiredSkills.value = generateRequiredSkills(jobData.tags);
      similarJobs.value = await findSimilarJobs(jobData);
    } else {
      throw new Error("Job not found");
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    showErrorToast("Job not found. Redirecting...");
    router.push("/jobs");
  } finally {
    isLoading.value = false;
  }
};

// Generate required skills based on tags
const generateRequiredSkills = (tags) => {
  const skillMap = {
    Marketing: ["Social Media Marketing", "Copywriting", "Project Management"],
    Design: ["UI/UX Design", "Graphic Design", "Prototyping"],
    Engineering: ["JavaScript", "Python", "System Design"],
    AI: ["Machine Learning", "Python", "Data Analysis"],
    HR: ["Recruiting", "Candidate Screening", "Interviewing"],
    Support: ["Customer Service", "Technical Support", "Communication"],
    Data: ["SQL", "Data Visualization", "Statistics"],
    Writing: ["Content Creation", "SEO", "Editing"],
  };
  return tags
    .reduce(
      (skills, tag) => {
        if (skillMap[tag]) skills.push(...skillMap[tag]);
        return skills;
      },
      ["English"]
    )
    .slice(0, 5);
};

// Find similar jobs
const findSimilarJobs = async (currentJob) => {
  if (!currentJob || !currentJob.id || !Array.isArray(currentJob.tags)) {
    return [];
  }
  let allJobs;
  try {
    allJobs = await jobStore.getAllJobs();
    allJobs = Array.isArray(allJobs)
      ? allJobs
      : Array.isArray(allJobs?.value)
      ? allJobs.value
      : [];
  } catch (error) {
    console.error("Error accessing jobs:", error);
    return [];
  }
  return allJobs
    .filter(
      (job) =>
        job.id !== currentJob.id &&
        Array.isArray(job.tags) &&
        job.tags.some((tag) => currentJob.tags.includes(tag))
    )
    .slice(0, 5);
};

// Modal control functions
const showApplicationModal = () => {
  isModalVisible.value = true;
  document.body.style.overflow = "hidden";
};

const hideApplicationModal = () => {
  isModalVisible.value = false;
  document.body.style.overflow = "";
};

// Ripple effect for buttons
const addRippleEffect = (event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  rippleStyle.left = `${x}px`;
  rippleStyle.top = `${y}px`;
  rippleActive.value = true;
  setTimeout(() => {
    rippleActive.value = false;
  }, 600);
};

// Handle application submission
const handleApplicationSuccess = (data) => {
  currentApplicationId.value = data.applicationId;
  applicationStatus.value = "success";
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  showSuccessToast(
    `Application submitted successfully! Reference ID: ${data.applicationId}`
  );
};

const handleApplicationError = (error) => {
  errorMessage.value =
    error.message || "Failed to submit application. Please try again.";
  applicationStatus.value = "error";
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  showErrorToast("Failed to submit application. Please try again.");
};

// Application status modal functions
const viewApplicationStatus = async (data) => {
  currentApplicationId.value = data.applicationId;
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  await fetchApplicationStatus();
};

const fetchApplicationStatus = async () => {
  if (!currentApplicationId.value) return;
  try {
    isLoadingStatus.value = true;
    const statusData = await getApplicationStatus(currentApplicationId.value);
    applicationStatus.value = statusData.status || "success";
  } catch (error) {
    console.error("Error fetching application status:", error);
    showErrorToast("Failed to load application status. Please try again.");
  } finally {
    isLoadingStatus.value = false;
  }
};

const closeStatusModal = () => {
  showStatusModal.value = false;
  document.body.style.overflow = "";
  setTimeout(() => {
    applicationStatus.value = "loading";
    errorMessage.value = "";
  }, 300);
};

const retryApplication = () => {
  applicationStatus.value = "loading";
  isLoadingStatus.value = true;
  setTimeout(() => {
    isLoadingStatus.value = false;
    applicationStatus.value = "success";
    currentApplicationId.value = "APP-" + Math.floor(Math.random() * 10000);
    showSuccessToast("Application resubmitted successfully!");
  }, 1500);
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Lifecycle hooks and route watcher
onMounted(() => {
  fetchData();
  if (!document.getElementById("toast-container")) {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }
});

// Watch route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      console.log("Route ID changed:", newId);
      fetchJobData(newId);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
@use "@/style/variables.css" as *;

.job-listing-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}
.company-logo {
  width: 60px;
  height: 60px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}
.company-logo-sm {
  width: 40px;
  height: 40px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}
.benefit-icon {
  width: 40px;
  height: 40px;
  background-color: var(--tertiary-color);
}
.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transition: all 0.3s ease;
}
.btn-primary:hover {
  background-color: #3935b8;
  border-color: #3935b8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(70, 64, 222, 0.2);
}
.btn-outline-secondary {
  transition: all 0.3s ease;
}
.btn-outline-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.text-primary {
  color: var(--primary-color) !important;
}
.bg-primary {
  background-color: var(--primary-color) !important;
}
.bg-secondary {
  background-color: var(--secondary-color) !important;
}
.bg-tertiary {
  background-color: var(--tertiary-color) !important;
}
.bg-primary-subtle {
  background-color: rgba(70, 64, 222, 0.1) !important;
}
.bg-warning-subtle {
  background-color: rgba(255, 184, 54, 0.1) !important;
}
.text-warning {
  color: var(--yellow-accent-color) !important;
}
.bg-success-subtle {
  background-color: rgba(86, 205, 173, 0.1) !important;
}
.text-success {
  color: var(--green-accent-color) !important;
}
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}
.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple 0.6s linear;
  transform: scale(0);
  pointer-events: none;
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
.job-header {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.job-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}
.badge {
  font-weight: 500;
  letter-spacing: 0.3px;
}
.breadcrumb-item + .breadcrumb-item::before {
  color: var(--primary-color);
}
.breadcrumb-item a {
  color: var(--primary-color);
  transition: color 0.3s ease;
}
.breadcrumb-item a:hover {
  color: #3935b8;
  text-decoration: underline !important;
}
@media (max-width: 768px) {
  .job-meta > div {
    flex-direction: column;
    align-items: flex-start;
  }
  .job-meta > div span:last-child {
    margin-top: 4px;
  }
}
.jobs-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-bottom: 10px;
}
.jobs-scroll-container::-webkit-scrollbar {
  display: none;
}
.job-card-wrapper {
  flex: 0 0 auto;
  width: 100%;
  padding-right: 16px;
}
@media (min-width: 576px) {
  .job-card-wrapper {
    width: 80%;
  }
}
@media (min-width: 768px) {
  .job-card-wrapper {
    width: 50%;
  }
}
@media (min-width: 992px) {
  .job-card-wrapper {
    width: 33.333%;
  }
}
@media (min-width: 1200px) {
  .job-card-wrapper {
    width: 25%;
  }
}
.scroll-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.scroll-btn:hover {
  background-color: var(--primary-color);
  color: white;
}
.scroll-btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(70, 64, 222, 0.25);
}
</style>

<template>
  <div class="post-job-form">
    <!-- Step 1: Job Information -->
    <div v-if="currentStep === 1" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Job Information</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleNext">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Title <span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                placeholder="e.g. Software Engineer"
                v-model="localJobData.title"
                required
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Category <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                v-model="localJobData.category"
                required
              >
                <option value="">Select job category</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="Customer Support">Customer Support</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold"
                >Job Type <span class="text-danger">*</span></label
              >
              <select
                class="form-select"
                v-model="localJobData.jobType"
                required
              >
                <option value="">Select job type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Salary Type</label>
              <select class="form-select" v-model="localJobData.salaryType">
                <option value="">Select salary type</option>
                <option value="Range">Range</option>
                <option value="Starting Amount">Starting Amount</option>
                <option value="Maximum Amount">Maximum Amount</option>
                <option value="Exact Amount">Exact Amount</option>
              </select>
            </div>
            <div class="col-md-4 mb-3" v-if="localJobData.salaryType">
              <label class="form-label fw-semibold">Currency</label>
              <select class="form-select" v-model="localJobData.currency">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
            </div>
            <div
              class="col-md-4 mb-3"
              v-if="localJobData.salaryType === 'Range'"
            >
              <label class="form-label fw-semibold">Minimum Salary</label>
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 50000"
                v-model="localJobData.salaryMin"
              />
            </div>
            <div
              class="col-md-4 mb-3"
              v-if="localJobData.salaryType === 'Range'"
            >
              <label class="form-label fw-semibold">Maximum Salary</label>
              <input
                type="number"
                class="form-control"
                placeholder="e.g. 80000"
                v-model="localJobData.salaryMax"
              />
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Education</label>
              <select class="form-select" v-model="localJobData.education">
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Associate Degree">Associate Degree</option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
                <option value="Master's Degree">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Experience</label>
              <select class="form-select" v-model="localJobData.experience">
                <option value="">Select experience level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="1-2 years">1-2 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5-10 years">5-10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Job Level</label>
              <select class="form-select" v-model="localJobData.jobLevel">
                <option value="">Select job level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label fw-semibold">Application Deadline</label>
              <input
                type="date"
                class="form-control"
                v-model="localJobData.expireDate"
              />
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">
              Next: Job Description <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Step 2: Job Description -->
    <div v-if="currentStep === 2" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Job Description</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleNext">
          <div class="mb-4">
            <label class="form-label fw-semibold"
              >Job Description <span class="text-danger">*</span></label
            >
            <textarea
              class="form-control"
              rows="6"
              placeholder="Enter job description..."
              v-model="localJobData.description"
              required
            ></textarea>
            <small class="text-muted">Maximum 500 words</small>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Responsibilities</label>
            <div
              class="mb-2"
              v-for="(responsibility, index) in localJobData.responsibilities"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.responsibilities[index]"
                  placeholder="Enter responsibility..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeResponsibility(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addResponsibility"
            >
              <i class="bi bi-plus me-1"></i>
              Add Responsibility
            </button>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Who You Are</label>
            <div
              class="mb-2"
              v-for="(requirement, index) in localJobData.whoYouAre"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.whoYouAre[index]"
                  placeholder="Enter requirement..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeRequirement(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addRequirement"
            >
              <i class="bi bi-plus me-1"></i>
              Add Requirement
            </button>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Nice-To-Haves</label>
            <div
              class="mb-2"
              v-for="(niceToHave, index) in localJobData.niceToHaves"
              :key="index"
            >
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="localJobData.niceToHaves[index]"
                  placeholder="Enter nice-to-have..."
                />
                <button
                  class="btn btn-outline-danger"
                  type="button"
                  @click="removeNiceToHave(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="addNiceToHave"
            >
              <i class="bi bi-plus me-1"></i>
              Add Nice-To-Have
            </button>
          </div>

          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="$emit('prev-step')"
            >
              <i class="bi bi-arrow-left me-1"></i>
              Previous
            </button>
            <button type="submit" class="btn btn-primary">
              Next: Perks & Benefits <i class="bi bi-arrow-right ms-1"></i>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Step 3: Perks & Benefits -->
    <div v-if="currentStep === 3" class="card">
      <div class="card-header bg-white border-bottom">
        <h5 class="mb-0 fw-bold">Perks & Benefits</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="form-label fw-semibold">Perks</label>
            <p class="text-muted small">
              Encourage more people to apply by sharing the attractive rewards
              and benefits you offer your employees
            </p>
            <div class="row">
              <div
                class="col-md-6 mb-2"
                v-for="perk in availablePerks"
                :key="perk.id"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="perk.id"
                    v-model="localJobData.perks"
                    :id="'perk-' + perk.id"
                  />
                  <label class="form-check-label" :for="'perk-' + perk.id">
                    <i :class="perk.icon + ' me-2'"></i>
                    {{ perk.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label fw-semibold">Benefits</label>
            <div class="row">
              <div
                class="col-md-6 mb-2"
                v-for="benefit in availableBenefits"
                :key="benefit.id"
              >
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :value="benefit.id"
                    v-model="localJobData.benefits"
                    :id="'benefit-' + benefit.id"
                  />
                  <label
                    class="form-check-label"
                    :for="'benefit-' + benefit.id"
                  >
                    <i :class="benefit.icon + ' me-2'"></i>
                    {{ benefit.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex justify-content-between">
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="$emit('prev-step')"
            >
              <i class="bi bi-arrow-left me-1"></i>
              Previous
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="isSubmitting"
            >
              <span
                v-if="isSubmitting"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              <i v-else class="bi bi-check me-1"></i>
              {{ isSubmitting ? "Creating Job..." : "Post Job" }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="showSuccessModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <div class="success-icon mb-3">
              <i
                class="bi bi-check-circle-fill text-success"
                style="font-size: 4rem"
              ></i>
            </div>
            <h4 class="mb-3">Job Posted Successfully!</h4>
            <p class="text-muted mb-4">
              Your job posting has been created and is now live. You can start
              receiving applications immediately.
            </p>
            <div class="d-flex gap-2 justify-content-center">
              <button @click="viewJob" class="btn btn-primary">View Job</button>
              <button @click="goToListing" class="btn btn-outline-secondary">
                All Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Modal -->
    <div v-if="showErrorModal" class="modal fade show d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body text-center p-4">
            <div class="error-icon mb-3">
              <i
                class="bi bi-exclamation-circle-fill text-danger"
                style="font-size: 4rem"
              ></i>
            </div>
            <h4 class="mb-3">Failed to Create Job</h4>
            <p class="text-muted mb-4">
              {{ errorMessage }}
            </p>
            <button @click="showErrorModal = false" class="btn btn-secondary">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isSubmitting" class="loading-overlay">
      <div class="loading-content">
        <div class="spinner-border text-primary mb-3" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <h5>Creating your job posting...</h5>
        <p class="text-muted">Please wait while we process your job details.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useCompanyJobStore } from "@/stores/company/companyJob";

const router = useRouter();
const jobStore = useCompanyJobStore();

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
  },
  jobData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update-job", "next-step", "prev-step", "submit"]);

// Component state
const localJobData = ref({ ...props.jobData });
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const errorMessage = ref("");
const createdJobId = ref(null);

const availablePerks = ref([
  {
    id: "full-healthcare",
    name: "Full Healthcare",
    icon: "bi bi-heart-pulse",
  },
  {
    id: "unlimited-vacation",
    name: "Unlimited Vacation",
    icon: "bi bi-calendar-heart",
  },
  {
    id: "skill-development",
    name: "Skill Development",
    icon: "bi bi-mortarboard",
  },
  { id: "team-summits", name: "Team Summits", icon: "bi bi-people" },
  { id: "remote-working", name: "Remote Working", icon: "bi bi-house" },
  {
    id: "commuter-benefits",
    name: "Commuter Benefits",
    icon: "bi bi-bus-front",
  },
  { id: "we-give-back", name: "We Give Back", icon: "bi bi-heart" },
  { id: "free-gym", name: "Free Gym Membership", icon: "bi bi-activity" },
]);

const availableBenefits = ref([
  {
    id: "health-insurance",
    name: "Health Insurance",
    icon: "bi bi-shield-plus",
  },
  {
    id: "dental-insurance",
    name: "Dental Insurance",
    icon: "bi bi-emoji-smile",
  },
  { id: "vision-insurance", name: "Vision Insurance", icon: "bi bi-eye" },
  {
    id: "life-insurance",
    name: "Life Insurance",
    icon: "bi bi-shield-check",
  },
  {
    id: "paid-time-off",
    name: "Paid Time Off",
    icon: "bi bi-calendar-check",
  },
  {
    id: "retirement-plan",
    name: "Retirement Plan",
    icon: "bi bi-piggy-bank",
  },
  {
    id: "flexible-schedule",
    name: "Flexible Schedule",
    icon: "bi bi-clock",
  },
  {
    id: "professional-development",
    name: "Professional Development",
    icon: "bi bi-graph-up-arrow",
  },
]);

// Initialize arrays if they don't exist
if (!localJobData.value.responsibilities)
  localJobData.value.responsibilities = [""];
if (!localJobData.value.whoYouAre) localJobData.value.whoYouAre = [""];
if (!localJobData.value.niceToHaves) localJobData.value.niceToHaves = [""];
if (!localJobData.value.perks) localJobData.value.perks = [];
if (!localJobData.value.benefits) localJobData.value.benefits = [];

// Watch for changes and emit updates
watch(
  localJobData,
  (newData) => {
    emit("update-job", newData);
  },
  { deep: true }
);

// Handle errors locally
const handleError = (error) => {
  let message = "An unexpected error occurred";

  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 400:
        message = data.message || "Invalid request data";
        break;
      case 401:
        message = "Authentication required. Please log in again.";
        break;
      case 403:
        message = "You do not have permission to perform this action";
        break;
      case 404:
        message = "Resource not found";
        break;
      case 409:
        message = data.message || "A conflict occurred";
        break;
      case 500:
        message = "Server error. Please try again later.";
        break;
      default:
        message = data.message || "Unexpected error occurred";
    }
  } else if (error.request) {
    message = "Network error. Please check your connection.";
  } else if (error.message) {
    message = error.message;
  }

  console.error("Error:", message, error);
  return message;
};

// Methods
const handleNext = () => {
  emit("update-job", localJobData.value);
  emit("next-step");
};

// FIXED: Proper job submission that makes jobs appear in listing
const handleSubmit = async () => {
  if (isSubmitting.value) return;

  try {
    isSubmitting.value = true;
    errorMessage.value = "";

    console.log("🚀 Submitting job data:", localJobData.value);

    // Create the job using the store - this will add it to the jobs list automatically
    const createdJob = await jobStore.createJob(localJobData.value);

    console.log("✅ Job created successfully:", createdJob);

    // Store the created job ID
    createdJobId.value = createdJob.id;

    // Emit success
    emit("submit", createdJob);

    // Show success modal
    showSuccessModal.value = true;
  } catch (error) {
    console.error("❌ Failed to create job:", error);
    errorMessage.value = handleError(error);
    showErrorModal.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

// Modal actions
const viewJob = () => {
  showSuccessModal.value = false;
  if (createdJobId.value) {
    router.push(`/company/job-details/${createdJobId.value}`);
  } else {
    goToListing();
  }
};

const goToListing = () => {
  showSuccessModal.value = false;
  router.push("/company/job-listing");
};

// Array manipulation methods
const addResponsibility = () => {
  localJobData.value.responsibilities.push("");
};

const removeResponsibility = (index) => {
  if (localJobData.value.responsibilities.length > 1) {
    localJobData.value.responsibilities.splice(index, 1);
  }
};

const addRequirement = () => {
  localJobData.value.whoYouAre.push("");
};

const removeRequirement = (index) => {
  if (localJobData.value.whoYouAre.length > 1) {
    localJobData.value.whoYouAre.splice(index, 1);
  }
};

const addNiceToHave = () => {
  localJobData.value.niceToHaves.push("");
};

const removeNiceToHave = (index) => {
  if (localJobData.value.niceToHaves.length > 1) {
    localJobData.value.niceToHaves.splice(index, 1);
  }
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal.show {
  background: rgba(0, 0, 0, 0.5);
}

.success-icon i,
.error-icon i {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.form-control:focus,
.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.btn-primary {
  background-color: #6366f1;
  border-color: #6366f1;
}

.btn-primary:hover {
  background-color: #5856eb;
  border-color: #5856eb;
}

.btn-primary:disabled {
  background-color: #a5b4fc;
  border-color: #a5b4fc;
}

.input-group .btn-outline-danger:hover {
  background-color: #dc3545;
  border-color: #dc3545;
  color: white;
}

.form-check-input:checked {
  background-color: #6366f1;
  border-color: #6366f1;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card-header {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.form-label {
  color: #374151;
  margin-bottom: 0.5rem;
}

.text-danger {
  color: #dc3545 !important;
}

.text-muted {
  color: #6b7280 !important;
}

@media (max-width: 768px) {
  .loading-content {
    margin: 1rem;
    padding: 1.5rem;
  }

  .modal-dialog {
    margin: 1rem;
  }
}
</style>

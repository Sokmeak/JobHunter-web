<template>
  <transition name="modal-backdrop" appear>
    <div class="modal-backdrop" v-if="isVisible" @click="close"></div>
  </transition>

  <transition name="modal-content" appear>
    <div class="modal modal-dialog-scrollable d-block" v-if="isVisible">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Application Status Bar -->
          <!-- <div v-if="showStatusBar" class="application-status-bar">
            <div
              class="status-progress"
              :style="{ width: `${statusProgress}%` }"
            ></div>
            <div
              class="status-content d-flex align-items-center justify-content-between px-3 py-2"
            >
              <div class="d-flex align-items-center">
                <div class="status-icon me-2" :class="statusIconClass">
                  <i :class="statusIcon"></i>
                </div>
                <div>
                  <div class="status-title fw-bold">{{ statusTitle }}</div>
                  <div class="status-message small">{{ statusMessage }}</div>
                </div>
              </div>
              <button
                v-if="canDismissStatus"
                @click="dismissStatus"
                class="btn-close btn-sm"
              ></button>
            </div>
          </div> -->

          <!-- Modal Header -->
          <div class="modal-header border-0 pb-0">
            <div class="d-flex align-items-center gap-3">
              <div class="company-logo">
                <img
                  :src="job.companyLogo || defaultCompanyLogo"
                  :alt="`${job.company} logo`"
                  class="rounded"
                  width="48"
                  height="48"
                />
              </div>
              <div>
                <h5 class="modal-title fw-bold mb-1">{{ job.title }}</h5>
                <div class="text-secondary small">
                  {{ job.company }} • {{ job.location }} • {{ job.type }}
                </div>
              </div>
            </div>
            <button
              type="button"
              class="btn-close"
              @click="close"
              aria-label="Close"
            ></button>
          </div>

          <hr class="my-3" />

          <!-- Modal Body -->
          <div class="modal-body">
            <!-- Application Status Stepper -->
            <div
              v-if="applicationStatus !== 'idle'"
              class="application-stepper mb-4"
            >
              <div
                class="stepper-container d-flex justify-content-between position-relative"
              >
                <div
                  class="stepper-progress-bar"
                  :style="{ width: `${stepperProgress}%` }"
                ></div>

                <div
                  v-for="(step, index) in applicationSteps"
                  :key="index"
                  class="stepper-step d-flex flex-column align-items-center position-relative"
                  :class="{
                    completed: stepStatus[index] === 'completed',
                    active: stepStatus[index] === 'active',
                    pending: stepStatus[index] === 'pending',
                  }"
                >
                  <div
                    class="stepper-icon d-flex align-items-center justify-content-center rounded-circle"
                  >
                    <i
                      v-if="stepStatus[index] === 'completed'"
                      class="bi bi-check-lg"
                    ></i>
                    <template v-else>{{ index + 1 }}</template>
                  </div>
                  <div class="stepper-label mt-2 text-center small">
                    {{ step }}
                  </div>
                </div>
              </div>
            </div>

            <h5 class="fw-bold mb-3">{{ formTitle }}</h5>
            <p class="text-secondary mb-4">{{ formSubtitle }}</p>

            <form @submit.prevent="submitApplication">
              <!-- Personal Information Section -->
              <div class="mb-4">
                <div class="mb-3">
                  <label for="fullName" class="form-label fw-medium"
                    >Full name</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="fullName"
                    v-model="form.fullName"
                    placeholder="Enter your full name"
                    required
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  />
                </div>

                <div class="mb-3">
                  <label for="email" class="form-label fw-medium"
                    >Email address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="form.email"
                    placeholder="Enter your email address"
                    required
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  />
                </div>

                <div class="mb-3">
                  <label for="phone" class="form-label fw-medium"
                    >Phone number</label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    id="phone"
                    v-model="form.phone"
                    placeholder="Enter your phone number"
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  />
                </div>

                <div class="mb-3">
                  <label for="jobTitle" class="form-label fw-medium"
                    >Current or previous job title</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="jobTitle"
                    v-model="form.jobTitle"
                    placeholder="What's your current or previous job title?"
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  />
                </div>
              </div>

              <!-- Links Section -->
              <div class="mb-4">
                <h6 class="fw-bold text-uppercase mb-3 text-secondary">
                  Links
                </h6>

                <div class="mb-3">
                  <label for="linkedin" class="form-label fw-medium"
                    >LinkedIn URL</label
                  >
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-linkedin"></i>
                    </span>
                    <input
                      type="url"
                      class="form-control"
                      id="linkedin"
                      v-model="form.linkedin"
                      placeholder="Link to your LinkedIn profile"
                      :disabled="
                        isSubmitting || applicationStatus === 'submitted'
                      "
                    />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="portfolio" class="form-label fw-medium"
                    >Portfolio URL</label
                  >
                  <div class="input-group">
                    <span class="input-group-text bg-light">
                      <i class="bi bi-globe"></i>
                    </span>
                    <input
                      type="url"
                      class="form-control"
                      id="portfolio"
                      v-model="form.portfolio"
                      placeholder="Link to your portfolio website"
                      :disabled="
                        isSubmitting || applicationStatus === 'submitted'
                      "
                    />
                  </div>
                </div>
              </div>

              <hr class="my-4" />

              <!-- Additional Information Section -->
              <div class="mb-4">
                <label for="additionalInfo" class="form-label fw-medium"
                  >Additional information</label
                >
                <div class="form-control p-0 overflow-hidden">
                  <textarea
                    id="additionalInfo"
                    v-model="form.additionalInfo"
                    class="form-control border-0"
                    rows="5"
                    placeholder="Add a cover letter or anything else you want to share"
                    :maxlength="maxAdditionalInfoLength"
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  ></textarea>
                  <div
                    class="bg-light border-top px-3 py-2 d-flex align-items-center"
                  >
                    <div class="btn-group me-2">
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Insert emoji"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-emoji-smile"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Bold"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-type-bold"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Italic"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-type-italic"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Bullet list"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-list-ul"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Numbered list"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-list-ol"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-sm btn-light"
                        title="Insert link"
                        :disabled="
                          isSubmitting || applicationStatus === 'submitted'
                        "
                      >
                        <i class="bi bi-link-45deg"></i>
                      </button>
                    </div>
                    <div class="ms-auto text-secondary small">
                      {{ form.additionalInfo.length }} /
                      {{ maxAdditionalInfoLength }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Resume Upload Section -->
              <div class="mb-4">
                <label class="form-label fw-medium">Attach your resume</label>
                <div
                  class="border border-2 border-dashed rounded-3 p-4 text-center cursor-pointer"
                  :class="{
                    'border-primary': isDragging,
                    'opacity-50':
                      isSubmitting || applicationStatus === 'submitted',
                  }"
                  @click="triggerFileInput"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleFileDrop"
                >
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileUpload"
                    class="d-none"
                    :accept="acceptedFileTypes"
                    :disabled="
                      isSubmitting || applicationStatus === 'submitted'
                    "
                  />
                  <div v-if="!form.resume">
                    <i class="bi bi-cloud-arrow-up fs-3 text-primary mb-2"></i>
                    <p class="mb-1">
                      Drag and drop your resume here or click to browse
                    </p>
                    <p class="text-secondary small mb-0">
                      Supported formats: {{ acceptedFileTypesDisplay }}
                    </p>
                  </div>
                  <div
                    v-else
                    class="d-flex align-items-center justify-content-center"
                  >
                    <i
                      class="bi bi-file-earmark-text fs-4 text-primary me-2"
                    ></i>
                    <span>{{ form.resume.name }}</span>
                    <button
                      type="button"
                      class="btn btn-sm btn-link text-danger ms-2"
                      @click.stop="removeFile"
                      :disabled="
                        isSubmitting || applicationStatus === 'submitted'
                      "
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="d-grid mb-4">
                <button
                  v-if="applicationStatus !== 'submitted'"
                  type="submit"
                  class="btn btn-primary py-2 fw-medium"
                  :disabled="isSubmitting || applicationStatus === 'submitted'"
                >
                  <span v-if="isSubmitting">
                    <span
                      class="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Submitting...
                  </span>
                  <span v-else>{{ submitButtonText }}</span>
                </button>

                <div v-else class="d-flex gap-2">
                  <button
                    type="button"
                    class="btn btn-outline-primary py-2 fw-medium flex-grow-1"
                    @click="close"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary py-2 fw-medium flex-grow-1"
                    @click="viewApplicationStatus"
                  >
                    View Application Status
                  </button>
                </div>
              </div>

              <!-- Terms -->
              <p class="text-secondary text-center small mb-0">
                By sending the request you confirm that you accept our
                <a :href="termsUrl" class="text-decoration-none"
                  >Terms of Service</a
                >
                and
                <a :href="privacyUrl" class="text-decoration-none"
                  >Privacy Policy</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch } from "vue";

// Props with default values
const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  job: {
    type: Object,
    default: () => ({
      id: "default-job-id",
      title: "Social Media Assistant",
      company: "Stripe",
      location: "Paris, France",
      type: "Full-Time",
      companyLogo:
        "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
    }),
  },
  formTitle: {
    type: String,
    default: "Submit your application",
  },
  formSubtitle: {
    type: String,
    default:
      "The following is required and will only be shared with the company",
  },
  submitButtonText: {
    type: String,
    default: "Submit Application",
  },
  maxAdditionalInfoLength: {
    type: Number,
    default: 500,
  },
  acceptedFileTypes: {
    type: String,
    default: ".pdf,.doc,.docx",
  },
  acceptedFileTypesDisplay: {
    type: String,
    default: "PDF, DOC, DOCX",
  },
  termsUrl: {
    type: String,
    default: "#",
  },
  privacyUrl: {
    type: String,
    default: "#",
  },
  apiEndpoint: {
    type: String,
    default: "/api/applications",
  },
  defaultCompanyLogo: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
  },
});

// Emits
const emit = defineEmits([
  "close",
  "submit-success",
  "submit-error",
  "status-change",
  "view-status",
]);

// Reactive state
const isDragging = ref(false);
const isSubmitting = ref(false);
const fileInput = ref(null);
const form = reactive({
  fullName: "",
  email: "",
  phone: "",
  jobTitle: "",
  linkedin: "",
  portfolio: "",
  additionalInfo: "",
  resume: null,
});

// Application status tracking
const applicationStatus = ref("idle"); // idle, submitting, submitted, error
const applicationId = ref(null);
const showStatusBar = ref(false);
const statusTitle = ref("");
const statusMessage = ref("");
const statusIcon = ref("");
const statusIconClass = ref("");
const canDismissStatus = ref(false);

// Application steps
const applicationSteps = [
  "Submit Application",
  "Review",
  "Interview",
  "Decision",
];
const stepStatus = reactive(["active", "pending", "pending", "pending"]);
const currentStep = ref(0);

// Computed properties
const statusProgress = computed(() => {
  switch (applicationStatus.value) {
    case "submitting":
      return 50;
    case "submitted":
      return 100;
    case "error":
      return 100;
    default:
      return 0;
  }
});

const stepperProgress = computed(() => {
  // Calculate progress based on current step (0-3)
  return (currentStep.value / (applicationSteps.length - 1)) * 100;
});

// Watch for status changes
watch(applicationStatus, (newStatus) => {
  updateStatusBar(newStatus);
  emit("status-change", {
    status: newStatus,
    applicationId: applicationId.value,
  });
});

// Methods
const updateStatusBar = (status) => {
  switch (status) {
    case "submitting":
      showStatusBar.value = true;
      statusTitle.value = "Submitting Application";
      statusMessage.value = "Please wait while we submit your application...";
      statusIcon.value = "bi bi-arrow-repeat";
      statusIconClass.value = "text-primary spinner";
      canDismissStatus.value = false;
      break;
    case "submitted":
      showStatusBar.value = true;
      statusTitle.value = "Application Submitted";
      statusMessage.value = `Your application has been submitted successfully! Reference ID: ${applicationId.value}`;
      statusIcon.value = "bi bi-check-circle-fill";
      statusIconClass.value = "text-success";
      canDismissStatus.value = true;

      // Update stepper
      stepStatus[0] = "completed";
      stepStatus[1] = "active";
      currentStep.value = 1;
      break;
    case "error":
      showStatusBar.value = true;
      statusTitle.value = "Submission Failed";
      statusMessage.value =
        "There was an error submitting your application. Please try again.";
      statusIcon.value = "bi bi-exclamation-circle-fill";
      statusIconClass.value = "text-danger";
      canDismissStatus.value = true;
      break;
    default:
      showStatusBar.value = false;
      break;
  }
};

const dismissStatus = () => {
  showStatusBar.value = false;
};

const close = () => {
  emit("close");
};

const triggerFileInput = () => {
  if (isSubmitting.value || applicationStatus.value === "submitted") return;
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    form.resume = file;
  }
};

const handleFileDrop = (event) => {
  if (isSubmitting.value || applicationStatus.value === "submitted") return;

  isDragging.value = false;
  const file = event.dataTransfer.files[0];

  // Check if file type is accepted
  const fileExtension = file.name.split(".").pop().toLowerCase();
  const acceptedExtensions = props.acceptedFileTypes
    .split(",")
    .map((ext) => ext.trim().replace(".", "").toLowerCase());

  if (file && acceptedExtensions.includes(fileExtension)) {
    form.resume = file;
  } else {
    // Could add error handling here
    console.error("File type not accepted");
  }
};

const removeFile = () => {
  form.resume = null;
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const submitApplication = async () => {
  try {
    isSubmitting.value = true;
    applicationStatus.value = "submitting";

    // Create form data for file upload
    const formData = new FormData();

    // Add all form fields to formData
    Object.keys(form).forEach((key) => {
      if (key === "resume" && form[key]) {
        formData.append(key, form[key]);
      } else if (key !== "resume") {
        formData.append(key, form[key]);
      }
    });

    // Add job ID to formData
    formData.append("jobId", props.job.id);

    // Simulate API call with delay
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate a random application ID
    applicationId.value = `APP-${Date.now().toString().slice(-6)}`;

    // Simulate successful submission
    console.log("Application submitted:", Object.fromEntries(formData));

    // Update application status
    applicationStatus.value = "submitted";

    // Emit success event with form data
    emit("submit-success", {
      jobId: props.job.id,
      applicationId: applicationId.value,
      applicant: {
        name: form.fullName,
        email: form.email,
      },
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    applicationStatus.value = "error";
    emit("submit-error", error);
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.keys(form).forEach((key) => {
    if (key === "resume") {
      form[key] = null;
    } else {
      form[key] = "";
    }
  });

  if (fileInput.value) {
    fileInput.value.value = "";
  }

  // Reset application status
  applicationStatus.value = "idle";
  applicationId.value = null;
  showStatusBar.value = false;

  // Reset stepper
  stepStatus.forEach((_, index) => {
    stepStatus[index] = index === 0 ? "active" : "pending";
  });
  currentStep.value = 0;
};

const viewApplicationStatus = () => {
  emit("view-status", {
    applicationId: applicationId.value,
    jobId: props.job.id,
  });
};

// Lifecycle hooks
onMounted(() => {
  // Handle escape key to close modal
  const handleEscKey = (event) => {
    if (event.key === "Escape" && props.isVisible) {
      close();
    }
  };

  window.addEventListener("keydown", handleEscKey);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener("keydown", handleEscKey);
  });
});

// Reset form when modal is opened
watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      // Don't reset if there's a submitted application
      if (applicationStatus.value !== "submitted") {
        resetForm();
      }
    }
  }
);
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 1.5rem;
}

.modal-dialog {
  margin: 0 auto;
  max-width: 95%;
  max-height: 95vh;
}

.cursor-pointer {
  cursor: pointer;
}

/* Custom scrollbar for the modal */
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Animation for backdrop */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Animation for modal content */
.modal-content-enter-active,
.modal-content-leave-active {
  transition: all 0.4s ease-out;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.modal-content-enter-active .modal-dialog,
.modal-content-leave-active .modal-dialog {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.modal-content-enter-from .modal-dialog,
.modal-content-leave-to .modal-dialog {
  transform: translateY(30px) scale(0.95);
}

/* Application Status Bar */
.application-status-bar {
  position: relative;
  overflow: hidden;
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.status-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: rgba(var(--bs-primary-rgb), 0.1);
  transition: width 0.5s ease;
  z-index: 0;
}

.status-content {
  position: relative;
  z-index: 1;
}

.status-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon.spinner i {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Application Stepper */
.application-stepper {
  padding: 1rem 0;
}

.stepper-container {
  padding: 0 1rem;
}

.stepper-progress-bar {
  position: absolute;
  height: 2px;
  background-color: var(--bs-primary);
  top: 16px;
  left: 0;
  transition: width 0.5s ease;
  z-index: 0;
}

.stepper-step {
  z-index: 1;
  width: 80px;
}

.stepper-icon {
  width: 32px;
  height: 32px;
  background-color: #e9ecef;
  color: #6c757d;
  font-weight: bold;
  transition: all 0.3s ease;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stepper-step.active .stepper-icon {
  background-color: var(--bs-primary);
  color: white;
}

.stepper-step.completed .stepper-icon {
  background-color: var(--bs-success);
  color: white;
}

.stepper-label {
  color: #6c757d;
  font-size: 0.75rem;
  max-width: 80px;
  transition: color 0.3s ease;
}

.stepper-step.active .stepper-label {
  color: var(--bs-primary);
  font-weight: 500;
}

.stepper-step.completed .stepper-label {
  color: var(--bs-success);
  font-weight: 500;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .modal-dialog {
    max-width: 700px;
  }
}
</style>

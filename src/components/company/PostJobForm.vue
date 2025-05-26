<template>
  <div class="post-job-form">
    <!-- Header -->
    <div class="d-flex align-items-center mb-4">
      <button class="btn btn-link text-dark p-0 me-3" @click="goBack">
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h2 class="mb-0">Post a Job</h2>
    </div>

    <!-- Step Indicators -->
    <div class="row mb-5">
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <div
            class="step-circle rounded-circle d-flex align-items-center justify-content-center me-3"
            :class="
              currentStep >= 1 ? 'bg-primary text-white' : 'bg-light text-muted'
            "
            style="width: 48px; height: 48px"
          >
            <i class="bi bi-briefcase"></i>
          </div>
          <div>
            <div class="fw-medium">Step 1/3</div>
            <div class="text-muted">Job Information</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <div
            class="step-circle rounded-circle d-flex align-items-center justify-content-center me-3"
            :class="
              currentStep >= 2 ? 'bg-primary text-white' : 'bg-light text-muted'
            "
            style="width: 48px; height: 48px"
          >
            <i class="bi bi-file-text"></i>
          </div>
          <div>
            <div class="fw-medium">Step 2/3</div>
            <div class="text-muted">Job Description</div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="d-flex align-items-center">
          <div
            class="step-circle rounded-circle d-flex align-items-center justify-content-center me-3"
            :class="
              currentStep >= 3 ? 'bg-primary text-white' : 'bg-light text-muted'
            "
            style="width: 48px; height: 48px"
          >
            <i class="bi bi-gift"></i>
          </div>
          <div>
            <div class="fw-medium">Step 3/3</div>
            <div class="text-muted">Perks & Benefit</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 1: Job Information -->
    <div v-if="currentStep === 1" class="step-content">
      <div class="mb-4">
        <h4 class="mb-2">Basic Information</h4>
        <p class="text-muted">This information will be displayed publicly</p>
      </div>

      <div class="row g-4">
        <div class="col-12">
          <label class="form-label fw-medium">Job Title</label>
          <input
            type="text"
            class="form-control form-control-lg"
            v-model="jobForm.title"
            placeholder="e.g. Software Engineer"
          />
          <div class="d-flex justify-content-between mt-1">
            <small class="text-muted"
              >Job titles must be describe one position</small
            >
            <small class="text-muted">At least 80 characters</small>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label fw-medium">Type of Employment</label>
          <p class="text-muted small mb-3">
            You can select multiple type of employment
          </p>
          <div class="row g-3">
            <div class="col-md-6" v-for="type in employmentTypes" :key="type">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :value="type"
                  v-model="jobForm.employmentTypes"
                  :id="type.toLowerCase().replace('-', '')"
                />
                <label
                  class="form-check-label"
                  :for="type.toLowerCase().replace('-', '')"
                >
                  {{ type }}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label fw-medium">Salary</label>
          <p class="text-muted small mb-3">
            Please specify the estimated salary range for the role. *You can
            leave this blank
          </p>
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <span class="fw-medium">$</span>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control"
                v-model="jobForm.salaryMin"
                placeholder="5,000"
              />
            </div>
            <div class="col-auto">
              <span class="text-muted">to</span>
            </div>
            <div class="col-auto">
              <span class="fw-medium">$</span>
            </div>
            <div class="col">
              <input
                type="number"
                class="form-control"
                v-model="jobForm.salaryMax"
                placeholder="22,000"
              />
            </div>
          </div>
          <div class="mt-3">
            <input
              type="range"
              class="form-range"
              min="0"
              max="100000"
              v-model="jobForm.salaryMin"
            />
          </div>
        </div>

        <div class="col-md-6">
          <label class="form-label fw-medium">Categories</label>
          <p class="text-muted small mb-2">
            You can select multiple job categories
          </p>
          <select class="form-select" v-model="jobForm.category">
            <option value="">Select Job Categories</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="marketing">Marketing</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div class="col-12">
          <label class="form-label fw-medium">Required Skills</label>
          <p class="text-muted small mb-3">Add required skills for the job</p>
          <div class="d-flex flex-wrap gap-2 mb-3">
            <span
              v-for="skill in jobForm.skills"
              :key="skill"
              class="badge bg-primary-subtle text-primary px-3 py-2"
            >
              {{ skill }}
              <button
                class="btn btn-sm p-0 ms-2"
                @click="removeSkill(skill)"
                style="background: none; border: none; color: inherit"
              >
                <i class="bi bi-x"></i>
              </button>
            </span>
          </div>
          <button class="btn btn-outline-primary" @click="addSkill">
            <i class="bi bi-plus me-1"></i>Add Skills
          </button>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-5">
        <button class="btn btn-primary px-4" @click="nextStep">
          Next Step
        </button>
      </div>
    </div>

    <!-- Step 2: Job Description -->
    <div v-else-if="currentStep === 2" class="step-content">
      <div class="mb-4">
        <h4 class="mb-2">Details</h4>
        <p class="text-muted">
          Add the description of the job, responsibilities, who you are, and
          nice-to-haves.
        </p>
      </div>

      <div class="row g-4">
        <div class="col-12">
          <label class="form-label fw-medium">Job Descriptions</label>
          <p class="text-muted small mb-2">
            Job titles must be describe one position
          </p>
          <textarea
            class="form-control"
            rows="6"
            v-model="jobForm.description"
            placeholder="Enter job description"
          ></textarea>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="toolbar">
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('bold')"
              >
                <i class="bi bi-type-bold"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('italic')"
              >
                <i class="bi bi-type-italic"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('list')"
              >
                <i class="bi bi-list-ul"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('numbered-list')"
              >
                <i class="bi bi-list-ol"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="formatText('link')"
              >
                <i class="bi bi-link"></i>
              </button>
            </div>
            <div class="d-flex flex-column align-items-end">
              <small class="text-muted">Maximum 500 characters</small>
              <small class="text-muted"
                >{{ jobForm.description.length }} / 500</small
              >
            </div>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label fw-medium">Responsibilities</label>
          <p class="text-muted small mb-2">
            Outline the core responsibilities of the position
          </p>
          <textarea
            class="form-control"
            rows="6"
            v-model="jobForm.responsibilities"
            placeholder="Enter job responsibilities"
          ></textarea>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="toolbar">
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('bold')"
              >
                <i class="bi bi-type-bold"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('italic')"
              >
                <i class="bi bi-type-italic"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('list')"
              >
                <i class="bi bi-list-ul"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('numbered-list')"
              >
                <i class="bi bi-list-ol"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="formatText('link')"
              >
                <i class="bi bi-link"></i>
              </button>
            </div>
            <div class="d-flex flex-column align-items-end">
              <small class="text-muted">Maximum 500 characters</small>
              <small class="text-muted"
                >{{ jobForm.responsibilities.length }} / 500</small
              >
            </div>
          </div>
        </div>

        <div class="col-12">
          <label class="form-label fw-medium">Who You Are</label>
          <p class="text-muted small mb-2">
            Add your preferred candidates qualifications
          </p>
          <textarea
            class="form-control"
            rows="6"
            v-model="jobForm.qualifications"
            placeholder="Enter qualifications"
          ></textarea>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="toolbar">
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('bold')"
              >
                <i class="bi bi-type-bold"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('italic')"
              >
                <i class="bi bi-type-italic"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('list')"
              >
                <i class="bi bi-list-ul"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary me-1"
                @click="formatText('numbered-list')"
              >
                <i class="bi bi-list-ol"></i>
              </button>
              <button
                class="btn btn-sm btn-outline-secondary"
                @click="formatText('link')"
              >
                <i class="bi bi-link"></i>
              </button>
            </div>
            <div class="d-flex flex-column align-items-end">
              <small class="text-muted">Maximum 500 characters</small>
              <small class="text-muted"
                >{{ jobForm.qualifications.length }} / 500</small
              >
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-5">
        <button class="btn btn-outline-secondary px-4" @click="previousStep">
          Previous
        </button>
        <button class="btn btn-primary px-4" @click="nextStep">
          Next Step
        </button>
      </div>
    </div>

    <!-- Step 3: Perks & Benefits -->
    <div v-else-if="currentStep === 3" class="step-content">
      <div class="mb-4">
        <h4 class="mb-2">Basic Information</h4>
        <p class="text-muted">List out your top perks and benefits.</p>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Perks and Benefits</h5>
        <button class="btn btn-outline-primary" @click="addBenefit">
          <i class="bi bi-plus me-1"></i>Add Benefit
        </button>
      </div>
      <p class="text-muted small mb-4">
        Encourage more people to apply by sharing the attractive rewards and
        benefits you offer your employees
      </p>

      <div class="row g-3 mb-4">
        <div
          class="col-md-6"
          v-for="benefit in jobForm.benefits"
          :key="benefit.id"
        >
          <div class="card border h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-3"
              >
                <div class="benefit-icon bg-primary-subtle rounded p-3 me-3">
                  <i :class="benefit.icon" class="text-primary fs-4"></i>
                </div>
                <button
                  class="btn btn-sm btn-outline-danger"
                  @click="removeBenefit(benefit.id)"
                >
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <h6 class="mb-2">{{ benefit.title }}</h6>
              <p class="text-muted small mb-0">{{ benefit.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-5">
        <button class="btn btn-outline-secondary px-4" @click="previousStep">
          Previous
        </button>
        <button class="btn btn-primary px-4" @click="submitJob">
          Do a Review
        </button>
      </div>
    </div>

    <!-- Job Preview Step -->
    <div v-else-if="currentStep === 4" class="step-content">
      <div class="job-preview">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <div class="d-flex align-items-start">
            <div
              class="bg-primary rounded-3 p-3 me-3"
              style="width: 80px; height: 80px"
            >
              <span class="text-white fw-bold h4">S</span>
            </div>
            <div>
              <h2 class="mb-2">
                {{ jobForm.title || "Social Media Assistant" }}
              </h2>
              <div class="d-flex align-items-center text-muted mb-2">
                <span class="me-3">Stripe</span>
                <span class="me-3">•</span>
                <span class="me-3">Paris, France</span>
                <span class="me-3">•</span>
                <span>{{
                  jobForm.employmentTypes.join(", ") || "Full-Time"
                }}</span>
              </div>
            </div>
          </div>
          <button class="btn btn-outline-primary" @click="editJobDetails">
            <i class="bi bi-pencil me-1"></i>Edit Job Details
          </button>
        </div>

        <div class="row">
          <div class="col-lg-8">
            <div class="mb-4">
              <h4 class="mb-3">Description</h4>
              <p class="text-muted">
                {{
                  jobForm.description || "Job description will appear here..."
                }}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="mb-3">Responsibilities</h4>
              <p class="text-muted">
                {{
                  jobForm.responsibilities ||
                  "Job responsibilities will appear here..."
                }}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="mb-3">Who You Are</h4>
              <p class="text-muted">
                {{
                  jobForm.qualifications || "Qualifications will appear here..."
                }}
              </p>
            </div>

            <div class="mb-4">
              <h4 class="mb-3">Perks & Benefits</h4>
              <div class="row g-3">
                <div
                  class="col-md-6"
                  v-for="benefit in jobForm.benefits"
                  :key="benefit.id"
                >
                  <div class="d-flex align-items-start">
                    <div
                      class="benefit-icon bg-primary-subtle rounded p-2 me-3"
                    >
                      <i :class="benefit.icon" class="text-primary"></i>
                    </div>
                    <div>
                      <h6 class="mb-1">{{ benefit.title }}</h6>
                      <small class="text-muted">{{
                        benefit.description
                      }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h6 class="mb-3">About this role</h6>
                <div class="mb-3">
                  <div
                    class="d-flex justify-content-between align-items-center mb-1"
                  >
                    <span class="text-muted">5 applied</span>
                    <span class="text-muted">of 10 capacity</span>
                  </div>
                  <div class="progress" style="height: 6px">
                    <div
                      class="progress-bar bg-success"
                      style="width: 50%"
                    ></div>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <div class="text-muted small">Apply Before</div>
                    <div class="fw-medium">July 31, 2021</div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Job Posted On</div>
                    <div class="fw-medium">July 1, 2021</div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Job Type</div>
                    <div class="fw-medium">
                      {{ jobForm.employmentTypes.join(", ") || "Full-Time" }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Salary</div>
                    <div class="fw-medium">
                      ${{ jobForm.salaryMin }}-${{ jobForm.salaryMax }} USD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-5">
          <button class="btn btn-outline-secondary px-4" @click="previousStep">
            Previous
          </button>
          <button class="btn btn-success px-4" @click="publishJob">
            Publish Job
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const goBack = inject("goBack");
const currentStep = ref(1);

const employmentTypes = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract",
];

const jobForm = ref({
  title: "",
  employmentTypes: [],
  salaryMin: 5000,
  salaryMax: 22000,
  category: "",
  skills: ["Graphic Design", "Communication", "Illustrator"],
  description: "",
  responsibilities: "",
  qualifications: "",
  benefits: [
    {
      id: 1,
      title: "Full Healthcare",
      description:
        "We believe in thriving communities and that starts with our team being happy and healthy.",
      icon: "bi bi-heart-pulse",
    },
    {
      id: 2,
      title: "Unlimited Vacation",
      description:
        "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
      icon: "bi bi-calendar-heart",
    },
    {
      id: 3,
      title: "Skill Development",
      description:
        "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
      icon: "bi bi-mortarboard",
    },
  ],
});

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++;
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const addSkill = () => {
  const skill = prompt("Enter skill:");
  if (skill) {
    jobForm.value.skills.push(skill);
  }
};

const removeSkill = (skill) => {
  const index = jobForm.value.skills.indexOf(skill);
  if (index > -1) {
    jobForm.value.skills.splice(index, 1);
  }
};

const formatText = (format) => {
  console.log("Formatting text:", format);
};

const addBenefit = () => {
  const title = prompt("Enter benefit title:");
  if (title) {
    const newBenefit = {
      id: Date.now(),
      title,
      description: "Enter benefit description...",
      icon: "bi bi-gift",
    };
    jobForm.value.benefits.push(newBenefit);
  }
};

const removeBenefit = (benefitId) => {
  jobForm.value.benefits = jobForm.value.benefits.filter(
    (b) => b.id !== benefitId
  );
};

const submitJob = () => {
  currentStep.value = 4; // Go to preview
};

const editJobDetails = () => {
  currentStep.value = 1; // Go back to edit
};

const publishJob = () => {
  console.log("Publishing job:", jobForm.value);
  alert("Job published successfully!");
  goBack();
};
</script>

<style scoped>
.step-circle {
  font-size: 1.2rem;
}

.benefit-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toolbar button {
  border: none;
  background: none;
}

.toolbar button:hover {
  background-color: #f8f9fa;
}

.form-control:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}
</style>

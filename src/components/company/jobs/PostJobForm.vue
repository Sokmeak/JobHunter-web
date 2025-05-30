<template>
  <div class="post-job-form">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1 fw-bold">Post a New Job</h2>
        <p class="text-muted mb-0">
          Create a new job posting to attract the best candidates
        </p>
      </div>
      <button class="btn btn-outline-secondary" @click="saveDraft">
        <i class="bi bi-save me-2"></i>Save as Draft
      </button>
    </div>

    <form @submit.prevent="submitJob" class="row g-4">
      <!-- Basic Information -->
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="mb-4 fw-bold">Basic Information</h5>

            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label fw-medium">Job Title *</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="jobForm.title"
                  placeholder="e.g. Senior Frontend Developer"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Department *</label>
                <select
                  class="form-select"
                  v-model="jobForm.department"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Employment Type *</label>
                <select class="form-select" v-model="jobForm.type" required>
                  <option value="">Select Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Location *</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="jobForm.location"
                  placeholder="e.g. San Francisco, CA or Remote"
                  required
                />
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Experience Level</label>
                <select class="form-select" v-model="jobForm.experienceLevel">
                  <option value="">Select Level</option>
                  <option value="Entry Level">Entry Level (0-2 years)</option>
                  <option value="Mid Level">Mid Level (3-5 years)</option>
                  <option value="Senior Level">Senior Level (6+ years)</option>
                  <option value="Executive">Executive</option>
                </select>
              </div>
              <div class="col-md-6">
                <label class="form-label fw-medium">Salary Range</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="jobForm.salaryMin"
                    placeholder="Min"
                  />
                  <span class="input-group-text">to</span>
                  <input
                    type="number"
                    class="form-control"
                    v-model="jobForm.salaryMax"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Job Description -->
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="mb-4 fw-bold">Job Description</h5>

            <div class="mb-3">
              <label class="form-label fw-medium">Job Summary *</label>
              <textarea
                class="form-control"
                rows="4"
                v-model="jobForm.summary"
                placeholder="Write a brief summary of the role..."
                required
              ></textarea>
            </div>

            <div class="mb-3">
              <label class="form-label fw-medium">Responsibilities</label>
              <div class="responsibilities-list">
                <div
                  v-for="(responsibility, index) in jobForm.responsibilities"
                  :key="index"
                  class="d-flex align-items-center mb-2"
                >
                  <input
                    type="text"
                    class="form-control me-2"
                    v-model="jobForm.responsibilities[index]"
                    placeholder="Add a responsibility..."
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeResponsibility(index)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="addResponsibility"
                >
                  <i class="bi bi-plus me-1"></i>Add Responsibility
                </button>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label fw-medium">Requirements</label>
              <div class="requirements-list">
                <div
                  v-for="(requirement, index) in jobForm.requirements"
                  :key="index"
                  class="d-flex align-items-center mb-2"
                >
                  <input
                    type="text"
                    class="form-control me-2"
                    v-model="jobForm.requirements[index]"
                    placeholder="Add a requirement..."
                  />
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeRequirement(index)"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm"
                  @click="addRequirement"
                >
                  <i class="bi bi-plus me-1"></i>Add Requirement
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Buttons -->
      <div class="col-12">
        <div class="d-flex justify-content-end gap-3">
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-outline-primary"
            @click="preview"
          >
            Preview
          </button>
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-check-circle me-2"></i>Post Job
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const jobForm = ref({
  title: "",
  department: "",
  type: "",
  location: "",
  experienceLevel: "",
  salaryMin: "",
  salaryMax: "",
  summary: "",
  responsibilities: [""],
  requirements: [""],
});

const addResponsibility = () => {
  jobForm.value.responsibilities.push("");
};

const removeResponsibility = (index) => {
  jobForm.value.responsibilities.splice(index, 1);
};

const addRequirement = () => {
  jobForm.value.requirements.push("");
};

const removeRequirement = (index) => {
  jobForm.value.requirements.splice(index, 1);
};

const submitJob = () => {
  console.log("Submitting job:", jobForm.value);
  router.push("/company/job-listing");
};

const saveDraft = () => {
  console.log("Saving as draft:", jobForm.value);
};

const preview = () => {
  console.log("Preview job:", jobForm.value);
};

const cancel = () => {
  router.push("/company/job-listing");
};
</script>

<style scoped>
.form-control:focus,
.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
</style>

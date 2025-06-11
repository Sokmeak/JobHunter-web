<template>
  <div class="post-job">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Post a Job</h2>
        <p class="text-muted mb-0">
          Find your next star performer with job post
        </p>
      </div>
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary" @click="saveDraft">
          Save as Draft
        </button>
        <button class="btn btn-primary" @click="previewJob">
          <i class="bi bi-eye me-1"></i>
          Preview
        </button>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="row">
          <div class="col-md-4">
            <div
              class="step-item d-flex align-items-center"
              :class="{ active: currentStep >= 1, completed: currentStep > 1 }"
            >
              <div class="step-number">
                <i v-if="currentStep > 1" class="bi bi-check"></i>
                <span v-else>1</span>
              </div>
              <div class="ms-3">
                <h6 class="mb-0">Job Information</h6>
                <small class="text-muted"
                  >Job title, type, location, etc.</small
                >
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="step-item d-flex align-items-center"
              :class="{ active: currentStep >= 2, completed: currentStep > 2 }"
            >
              <div class="step-number">
                <i v-if="currentStep > 2" class="bi bi-check"></i>
                <span v-else>2</span>
              </div>
              <div class="ms-3">
                <h6 class="mb-0">Job Description</h6>
                <small class="text-muted"
                  >Job description, responsibilities, etc.</small
                >
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div
              class="step-item d-flex align-items-center"
              :class="{ active: currentStep >= 3 }"
            >
              <div class="step-number">
                <span>3</span>
              </div>
              <div class="ms-3">
                <h6 class="mb-0">Perks & Benefits</h6>
                <small class="text-muted">Salary, benefits, etc.</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <PostJobForm
      :current-step="currentStep"
      :job-data="jobData"
      @update-job="updateJobData"
      @next-step="nextStep"
      @prev-step="prevStep"
      @submit="submitJob"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PostJobForm from "@/components/company/jobs/PostJobForm.vue";

export default {
  name: "PostJob",
  components: {
    PostJobForm,
  },
  setup() {
    const router = useRouter();
    const currentStep = ref(1);

    const jobData = ref({
      // Step 1: Job Information
      title: "",
      category: "",
      jobType: "",
      salaryType: "",
      salaryMin: "",
      salaryMax: "",
      currency: "USD",
      education: "",
      experience: "",
      jobLevel: "",
      expireDate: "",

      // Step 2: Job Description
      description: "",
      responsibilities: [],
      whoYouAre: [],
      niceToHaves: [],

      // Step 3: Perks & Benefits
      perks: [],
      benefits: [],
    });

    const updateJobData = (data) => {
      jobData.value = { ...jobData.value, ...data };
    };

    const nextStep = () => {
      if (currentStep.value < 3) {
        currentStep.value++;
      }
    };

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--;
      }
    };

    const saveDraft = () => {
      // Save as draft logic
      alert("Job saved as draft!");
    };

    const previewJob = () => {
      // Preview job logic
      alert("Preview job functionality");
    };

    const submitJob = () => {
      // Submit job logic
      alert("Job posted successfully!");
      router.push("/company/jobs");
    };

    return {
      currentStep,
      jobData,
      updateJobData,
      nextStep,
      prevStep,
      saveDraft,
      previewJob,
      submitJob,
    };
  },
};
</script>

<style scoped>
.step-item {
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--light-gray);
  color: var(--text-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
}

.step-item.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.step-item.completed .step-number {
  background-color: var(--secondary-color);
  color: white;
}

.step-item.active h6 {
  color: var(--primary-color);
}
</style>

<template>
  <div class="edit-job">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Edit Job</h2>
        <p class="text-muted mb-0">Edit the job details below</p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="goBack">
          Cancel
        </button>
        <button class="btn btn-primary" @click="saveJob" :disabled="loading">
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
          ></span>
          Save Changes
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="initialLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading job details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <h5>Error Loading Job</h5>
      <p>{{ error }}</p>
      <button @click="loadJobData" class="btn btn-primary">Try Again</button>
    </div>

    <!-- Job Form -->
    <div v-else>
      <PostJobForm
        :current-step="currentStep"
        :job-data="jobData"
        @update-job="updateJobData"
        @next-step="nextStep"
        @prev-step="prevStep"
        @submit="submitJob"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostJobForm from "@/components/company/jobs/PostJobForm.vue";
import { useCompanyJobStore } from "@/stores/company/companyJob";

const route = useRoute();
const router = useRouter();
const store = useCompanyJobStore();

const currentStep = ref(1);
const loading = ref(false);
const initialLoading = ref(true);
const error = ref(null);
const jobData = ref({
  // Default structure matching PostJobForm expectations
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
  description: "",
  responsibilities: [""],
  whoYouAre: [""],
  niceToHaves: [""],
  perks: [],
  benefits: [],
  is_visible: true,
  location: "",
  capacity: "",
});

// Load job data from API
const loadJobData = async () => {
  try {
    initialLoading.value = true;
    error.value = null;

    const jobId = parseInt(route.params.id);
    console.log("🔍 Loading job for editing:", jobId);

    // Fetch job from API
    const job = await store.getJobById(jobId);

    if (!job) {
      throw new Error("Job not found");
    }

    console.log("📄 Loaded job data:", job);

    // Transform backend job to frontend format
    jobData.value = store.transformToFrontendFormat(job);

    console.log("✅ Transformed job data for editing:", jobData.value);
  } catch (err) {
    console.error("❌ Error loading job:", err);
    error.value = err.message || "Failed to load job details";
  } finally {
    initialLoading.value = false;
  }
};

const updateJobData = (data) => {
  jobData.value = { ...jobData.value, ...data };
  console.log("📝 Job data updated:", jobData.value);
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

const saveJob = async () => {
  try {
    loading.value = true;
    console.log("💾 Saving job changes:", jobData.value);

    const jobId = route.params.id;
    await store.updateJob(jobId, jobData.value);

    console.log("✅ Job updated successfully");
    alert("Job updated successfully!");
    router.push("/company/job-listing");
  } catch (error) {
    console.error("❌ Failed to update job:", error);
    alert("Failed to update job. Please try again.");
  } finally {
    loading.value = false;
  }
};

const submitJob = () => {
  // Called when form is submitted from last step
  saveJob();
};

const goBack = () => {
  router.back();
};

// Load job data when component mounts
onMounted(() => {
  console.log("🚀 Edit job component mounted");
  loadJobData();
});
</script>

<style scoped>
.edit-job {
  max-width: 100%;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.alert {
  border-radius: 8px;
}

@media (max-width: 768px) {
  .d-flex.justify-content-between {
    flex-direction: column;
    gap: 1rem;
  }

  .d-flex.gap-2 {
    justify-content: stretch;
  }

  .d-flex.gap-2 .btn {
    flex: 1;
  }
}
</style>

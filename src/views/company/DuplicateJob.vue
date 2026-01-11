<template>
  <div class="duplicate-job">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="fw-bold mb-1">Duplicate Job</h2>
        <p class="text-muted mb-0">
          Make a copy and edit the job details below
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary" @click="goBack">
          Cancel
        </button>
        <button
          class="btn btn-primary"
          @click="saveDuplicate"
          :disabled="loading"
        >
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm me-2"
          ></span>
          Save Job
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="initialLoading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-3 text-muted">Loading job for duplication...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-danger">
      <h5>Error Loading Job</h5>
      <p>{{ error }}</p>
      <button @click="loadOriginalJob" class="btn btn-primary">
        Try Again
      </button>
    </div>

    <!-- Job Form -->
    <div v-else>
      <div class="alert alert-info mb-4">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Duplicating Job:</strong> This will create a copy of the
        original job. You can modify any details before saving.
      </div>

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
  is_visible: false, // Start as draft for duplicated jobs
  location: "",
  capacity: "",
});

// Load original job data and prepare for duplication
const loadOriginalJob = async () => {
  try {
    initialLoading.value = true;
    error.value = null;

    const jobId = parseInt(route.params.id);
    console.log("🔍 Loading job for duplication:", jobId);

    // Fetch original job from API
    const originalJob = await store.getJobById(jobId);

    if (!originalJob) {
      throw new Error("Original job not found");
    }

    console.log("📄 Loaded original job:", originalJob);

    // Transform backend job to frontend format
    const frontendJob = store.transformToFrontendFormat(originalJob);

    // Prepare duplicated job data
    jobData.value = {
      ...frontendJob,
      id: null, // Remove ID so it creates a new job
      title: frontendJob.title + " (Copy)", // Add (Copy) to title
      is_visible: false, // Start as draft
      // Reset timestamps
      posted_at: null,
      created_at: null,
      updated_at: null,
      // Reset application stats
      applicant_applied: 0,
      views: 0,
    };

    console.log("✅ Prepared job data for duplication:", jobData.value);
  } catch (err) {
    console.error("❌ Error loading original job:", err);
    error.value = err.message || "Failed to load original job";
  } finally {
    initialLoading.value = false;
  }
};

const updateJobData = (data) => {
  jobData.value = { ...jobData.value, ...data };
  console.log("📝 Duplicated job data updated:", jobData.value);
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

const saveDuplicate = async () => {
  try {
    loading.value = true;
    console.log("📋 Creating duplicated job:", jobData.value);

    // Create new job using the store
    const createdJob = await store.createJob(jobData.value);

    console.log("✅ Job duplicated successfully:", createdJob);
    alert("Job duplicated successfully!");
    router.push("/company/job-listing");
  } catch (error) {
    console.error("❌ Failed to duplicate job:", error);
    alert("Failed to duplicate job. Please try again.");
  } finally {
    loading.value = false;
  }
};

const submitJob = () => {
  // Called when form is submitted from last step
  saveDuplicate();
};

const goBack = () => {
  router.back();
};

// Load original job data when component mounts
onMounted(() => {
  console.log("🚀 Duplicate job component mounted");
  loadOriginalJob();
});
</script>

<style scoped>
.duplicate-job {
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

.alert-info {
  background-color: #e7f3ff;
  border-color: #b3d9ff;
  color: #0c5460;
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

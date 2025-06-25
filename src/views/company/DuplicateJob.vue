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
        <button class="btn btn-primary" @click="saveDuplicate">Save Job</button>
      </div>
    </div>

    <!-- Job Form -->
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import PostJobForm from "@/components/company/jobs/PostJobForm.vue";
import { useCompanyJobStore } from "@/stores/company/companyJob";

export default {
  name: "DuplicateJob",
  components: {
    PostJobForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useCompanyJobStore();

    const currentStep = ref(1);
    const jobData = ref({
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
      responsibilities: [],
      whoYouAre: [],
      niceToHaves: [],
      perks: [],
      benefits: [],
    });

    onMounted(() => {
      const jobId = parseInt(route.params.id);
      const originalJob = store.getJobById(jobId);
      if (!originalJob) {
        alert("Original job not found");
        router.push("/company/job-listing");
        return;
      }
      // Copy the original job data but reset ID or any unique fields
      jobData.value = {
        ...originalJob,
        id: null,
        title: originalJob.title + " (Copy)",
      };
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

    const saveDuplicate = () => {
      // Add new job instead of update
      store.addJob(jobData.value);
      alert("Job duplicated successfully!");
      router.push("/company/job-listing");
    };

    const submitJob = () => {
      saveDuplicate();
    };

    const goBack = () => {
      router.back();
    };

    return {
      currentStep,
      jobData,
      updateJobData,
      nextStep,
      prevStep,
      saveDuplicate,
      submitJob,
      goBack,
    };
  },
};
</script>

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
        <button class="btn btn-primary" @click="saveJob">Save Changes</button>
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
import { useJobStore } from "@/stores/company/jobStore";

export default {
  name: "EditJob",
  components: {
    PostJobForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useJobStore();

    const currentStep = ref(1);
    const jobData = ref({
      // Same structure as PostJobForm expects
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
      const job = store.getJobById(jobId);
      if (!job) {
        alert("Job not found");
        router.push("/company/job-listing");
        return;
      }
      jobData.value = { ...job };
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

    const saveJob = () => {
      store.updateJob(jobData.value);
      alert("Job updated successfully!");
      router.push("/company/job-listing");
    };

    const submitJob = () => {
      // Optional: submit from last step
      saveJob();
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
      saveJob,
      submitJob,
      goBack,
    };
  },
};
</script>

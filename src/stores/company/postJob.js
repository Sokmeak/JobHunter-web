import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const usePostJobStore = defineStore("postJob", {
  state: () => ({
    currentStep: 1,
    jobData: {
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
    },
  }),
  actions: {
    updateJobData(data) {
      this.jobData = { ...this.jobData, ...data };
    },
    nextStep() {
      if (this.currentStep < 3) this.currentStep++;
    },
    prevStep() {
      if (this.currentStep > 1) this.currentStep--;
    },
    saveDraft() {
      // Your draft save logic here
      alert("Job saved as draft!");
    },
    previewJob() {
      // Your preview logic here
      alert("Preview job functionality");
    },
    submitJob() {
      // Your submit logic here
      // alert("Job posted successfully!");
      alert("Redirecting to job listing ....");
      // If you want to redirect after submit:
      // const router = useRouter();

      window.location.href = "/company/job-listing";
    },
  },
});

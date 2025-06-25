// stores/company/postJob.js
import { defineStore } from "pinia";
import { useCompanyJobStore } from "./companyJob";
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
      responsibilities: [""],
      whoYouAre: [""],
      niceToHaves: [""],

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
      // Save as draft (is_visible = false)
      const jobStore = useCompanyJobStore();
      const draftData = {
        ...this.jobData,
        is_visible: false,
      };

      return jobStore.createJob(draftData);
    },

    previewJob() {
      // Could open a preview modal or navigate to preview page
      console.log("Preview job:", this.jobData);
    },

    async submitJob() {
      const jobStore = useCompanyJobStore();
      const router = useRouter();

      try {
        // Create the job using the job store
        const createdJob = await jobStore.createJob(this.jobData);

        // Reset the form
        this.resetForm();

        // Navigate to job listing
        router.push("/company/job-listing");

        return createdJob;
      } catch (error) {
        throw error; // Let the component handle the error
      }
    },

    resetForm() {
      this.currentStep = 1;
      this.jobData = {
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
      };
    },
  },
});

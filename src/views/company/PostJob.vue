<template>
  <div class="post-job-wrapper">
    <!-- Progress Steps -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="steps-progress">
          <div class="step-indicator">
            <div
              class="step"
              :class="{
                active: currentStep === 1,
                completed: currentStep > 1,
              }"
            >
              <div class="step-number">
                <i v-if="currentStep > 1" class="bi bi-check"></i>
                <span v-else>1</span>
              </div>
              <div class="step-label">Job Information</div>
            </div>

            <div
              class="step-connector"
              :class="{ active: currentStep > 1 }"
            ></div>

            <div
              class="step"
              :class="{
                active: currentStep === 2,
                completed: currentStep > 2,
              }"
            >
              <div class="step-number">
                <i v-if="currentStep > 2" class="bi bi-check"></i>
                <span v-else>2</span>
              </div>
              <div class="step-label">Job Description</div>
            </div>

            <div
              class="step-connector"
              :class="{ active: currentStep > 2 }"
            ></div>

            <div
              class="step"
              :class="{
                active: currentStep === 3,
                completed: currentStep > 3,
              }"
            >
              <div class="step-number">
                <i v-if="currentStep > 3" class="bi bi-check"></i>
                <span v-else>3</span>
              </div>
              <div class="step-label">Perks & Benefits</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Component -->
    <PostJobForm
      :current-step="currentStep"
      :job-data="jobData"
      @update-job="updateJobData"
      @next-step="nextStep"
      @prev-step="prevStep"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import PostJobForm from "@/components/company/jobs/PostJobForm.vue";

const router = useRouter();

// State
const currentStep = ref(1);
const jobData = ref({
  // Step 1: Basic Information
  title: "",
  category: "",
  jobType: "",
  salaryType: "",
  currency: "USD",
  salaryMin: "",
  salaryMax: "",
  education: "",
  experience: "",
  jobLevel: "",
  expireDate: "",

  // Step 2: Description
  description: "",
  responsibilities: [""],
  whoYouAre: [""],
  niceToHaves: [""],

  // Step 3: Perks & Benefits
  perks: [],
  benefits: [],
  is_visible: true,
});

// Methods
const updateJobData = (newData) => {
  jobData.value = { ...jobData.value, ...newData };
  console.log("📝 Job data updated in wrapper:", jobData.value);
};

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++;
    console.log("➡️ Moving to step:", currentStep.value);
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
    console.log("⬅️ Moving to step:", currentStep.value);
  }
};

const handleSubmit = (createdJob) => {
  console.log("✅ Job submitted successfully:", createdJob);
  // The PostJobForm handles the success modal and navigation
  // We could add additional logic here if needed
};
</script>

<style scoped>
.steps-progress {
  padding: 20px 0;
}

.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  background-color: #e9ecef;
  color: #6c757d;
  border: 2px solid #e9ecef;
}

.step.active .step-number {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.step.completed .step-number {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}

.step-label {
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  transition: color 0.3s ease;
}

.step.active .step-label {
  color: #007bff;
}

.step.completed .step-label {
  color: #28a745;
}

.step-connector {
  height: 2px;
  background-color: #e9ecef;
  margin: 0 20px;
  flex: 1;
  margin-top: -20px;
  transition: background-color 0.3s ease;
}

.step-connector.active {
  background-color: #28a745;
}

.card {
  border: none;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .step-indicator {
    flex-direction: column;
    gap: 20px;
  }

  .step-connector {
    width: 2px;
    height: 40px;
    margin: 0;
    margin-top: 0;
    margin-left: 19px;
  }

  .step {
    flex-direction: row;
    text-align: left;
    width: 100%;
  }

  .step-number {
    margin-bottom: 0;
    margin-right: 12px;
    flex-shrink: 0;
  }

  .step-label {
    align-self: center;
  }
}
</style>

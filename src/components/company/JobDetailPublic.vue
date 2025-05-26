<template>
  <div class="job-detail-public">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="navigateHome">Home</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="navigateCompanies">Companies</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#" @click.prevent="navigateCompany">Nomad</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Social Media Assistant
        </li>
      </ol>
    </nav>

    <!-- Job Header -->
    <div class="row align-items-start mb-4">
      <div class="col-md-8">
        <div class="d-flex align-items-start">
          <div
            class="job-logo bg-primary rounded-3 p-3 me-3"
            style="width: 80px; height: 80px"
          >
            <span class="text-white fw-bold h4">S</span>
          </div>
          <div>
            <h1 class="h3 mb-2">Social Media Assistant</h1>
            <div class="d-flex align-items-center text-muted mb-2">
              <span class="me-3">Stripe</span>
              <span class="me-3">•</span>
              <span class="me-3">Paris, France</span>
              <span class="me-3">•</span>
              <span>Full-Time</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 text-end">
        <div class="d-flex justify-content-end gap-2 mb-3">
          <button class="btn btn-outline-secondary" @click="shareJob">
            <i class="bi bi-share"></i>
          </button>
          <button class="btn btn-primary px-4" @click="applyForJob">
            Apply
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <!-- Main Content -->
      <div class="col-lg-8">
        <!-- Description -->
        <section class="mb-5">
          <h4 class="mb-3">Description</h4>
          <p class="text-muted">
            Stripe is looking for Social Media Marketing expert to help manage
            our online networks. You will be responsible for monitoring our
            social media channels, creating content, finding effective ways to
            engage the community and incentivize others to engage on our
            channels.
          </p>
        </section>

        <!-- Responsibilities -->
        <section class="mb-5">
          <h4 class="mb-3">Responsibilities</h4>
          <ul class="list-unstyled">
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >Community engagement to ensure that is supported and actively
                represented online</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >Focus on social media content development and publication</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span>Marketing and strategy support</span>
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >Stay on top of trends on social media platforms, and suggest
                content ideas to the team</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span>Engage with online communities</span>
            </li>
          </ul>
        </section>

        <!-- Who You Are -->
        <section class="mb-5">
          <h4 class="mb-3">Who You Are</h4>
          <ul class="list-unstyled">
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >You get energy from people and building the ideal work
                environment</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >You have a sense for beautiful spaces and office
                experiences</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >You are a confident office manager, ready for added
                responsibilities</span
              >
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span>You're detail-oriented and creative</span>
            </li>
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span
                >You're a growth marketer and know how to run campaigns</span
              >
            </li>
          </ul>
        </section>

        <!-- Nice-To-Haves -->
        <section class="mb-5">
          <h4 class="mb-3">Nice-To-Haves</h4>
          <ul class="list-unstyled">
            <li class="d-flex align-items-start mb-2">
              <i class="bi bi-check-circle-fill text-success me-2 mt-1"></i>
              <span>Fluent in English</span>
            </li>
          </ul>
        </section>
      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h5 class="mb-3">About this role</h5>

            <div class="mb-3">
              <div
                class="d-flex justify-content-between align-items-center mb-1"
              >
                <span class="text-muted">{{ appliedCount }} applied</span>
                <span class="text-muted">of {{ totalCapacity }} capacity</span>
              </div>
              <div class="progress" style="height: 6px">
                <div
                  class="progress-bar bg-success"
                  :style="{ width: progressPercentage + '%' }"
                ></div>
              </div>
            </div>

            <div class="row g-3">
              <div class="col-6">
                <div class="text-muted small">Apply Before</div>
                <div class="fw-medium">{{ applyBefore }}</div>
              </div>
              <div class="col-6">
                <div class="text-muted small">Job Posted On</div>
                <div class="fw-medium">{{ jobPostedOn }}</div>
              </div>
              <div class="col-6">
                <div class="text-muted small">Job Type</div>
                <div class="fw-medium">{{ jobType }}</div>
              </div>
              <div class="col-6">
                <div class="text-muted small">Salary</div>
                <div class="fw-medium">{{ salary }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="card border-0 shadow-sm mt-4">
          <div class="card-body">
            <h6 class="mb-3">Categories</h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="category in categories"
                :key="category"
                class="badge rounded-pill"
                :class="getCategoryClass(category)"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>

        <!-- Required Skills -->
        <div class="card border-0 shadow-sm mt-4">
          <div class="card-body">
            <h6 class="mb-3">Required Skills</h6>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="skill in requiredSkills"
                :key="skill"
                class="badge bg-primary-subtle text-primary rounded-pill"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const appliedCount = ref(5);
const totalCapacity = ref(10);
const applyBefore = ref("July 31, 2021");
const jobPostedOn = ref("July 1, 2021");
const jobType = ref("Full-Time");
const salary = ref("$75k-$85k USD");

const categories = ref(["Marketing", "Design"]);
const requiredSkills = ref([
  "Project Management",
  "Copywriting",
  "Social Media Marketing",
  "English",
  "Copy Editing",
]);

const progressPercentage = computed(() => {
  return (appliedCount.value / totalCapacity.value) * 100;
});

const getCategoryClass = (category) => {
  switch (category.toLowerCase()) {
    case "marketing":
      return "bg-warning text-dark";
    case "design":
      return "bg-info text-white";
    default:
      return "bg-secondary text-white";
  }
};

const navigateHome = () => {
  console.log("Navigating to home");
};

const navigateCompanies = () => {
  console.log("Navigating to companies");
};

const navigateCompany = () => {
  console.log("Navigating to company profile");
};

const shareJob = () => {
  console.log("Sharing job");
  // Here you would typically open a share modal or copy link to clipboard
};

const applyForJob = () => {
  console.log("Applying for job");
  // Here you would typically navigate to application form or open modal
  alert("Application process would start here!");
};
</script>

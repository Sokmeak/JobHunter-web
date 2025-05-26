<template>
  <div class="job-details-page">
    <!-- Header -->
    <div class="d-flex align-items-center justify-content-between mb-4">
      <div class="d-flex align-items-center">
        <button class="btn btn-link text-dark p-0 me-3" @click="goBack">
          <i class="bi bi-arrow-left fs-4"></i>
        </button>
        <div>
          <h2 class="mb-1 fw-bold">Social Media Assistant</h2>
          <p class="text-muted mb-0">Design • Full-Time • 4 / 11 Hired</p>
        </div>
      </div>
      <div class="dropdown">
        <button
          class="btn btn-outline-primary dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          <i class="bi bi-chevron-down me-1"></i>More Action
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Edit Job</a></li>
          <li><a class="dropdown-item" href="#">Duplicate Job</a></li>
          <li><a class="dropdown-item" href="#">Archive Job</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item text-danger" href="#">Delete Job</a></li>
        </ul>
      </div>
    </div>

    <!-- Tab Navigation -->
    <ul class="nav nav-tabs border-0 mb-4">
      <li class="nav-item">
        <button
          class="nav-link border-0 px-0 me-4 fw-medium"
          :class="{ 'active text-primary': activeTab === 'applicants' }"
          @click="activeTab = 'applicants'"
          style="border-bottom: 3px solid transparent !important"
          :style="
            activeTab === 'applicants'
              ? 'border-bottom-color: #6366f1 !important;'
              : ''
          "
        >
          Applicants
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link border-0 px-0 me-4 text-muted fw-medium"
          :class="{ 'active text-primary': activeTab === 'job-details' }"
          @click="activeTab = 'job-details'"
          style="border-bottom: 3px solid transparent !important"
          :style="
            activeTab === 'job-details'
              ? 'border-bottom-color: #6366f1 !important;'
              : ''
          "
        >
          Job Details
        </button>
      </li>
      <li class="nav-item">
        <button
          class="nav-link border-0 px-0 text-muted fw-medium"
          :class="{ 'active text-primary': activeTab === 'analytics' }"
          @click="activeTab = 'analytics'"
          style="border-bottom: 3px solid transparent !important"
          :style="
            activeTab === 'analytics'
              ? 'border-bottom-color: #6366f1 !important;'
              : ''
          "
        >
          Analytics
        </button>
      </li>
    </ul>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Applicants Tab -->
      <div v-if="activeTab === 'applicants'">
        <ApplicantsPipeline @switchView="handleViewSwitch" />
      </div>

      <!-- Job Details Tab -->
      <div v-else-if="activeTab === 'job-details'">
        <div class="row">
          <div class="col-lg-8">
            <!-- Job Header -->
            <div class="d-flex align-items-start justify-content-between mb-4">
              <div class="d-flex align-items-start">
                <div
                  class="bg-primary rounded-3 p-3 me-4"
                  style="width: 80px; height: 80px"
                >
                  <span class="text-white fw-bold h3">S</span>
                </div>
                <div>
                  <h2 class="mb-2 fw-bold">Social Media Assistant</h2>
                </div>
              </div>
              <button class="btn btn-outline-primary">
                <i class="bi bi-pencil me-1"></i>Edit Job Details
              </button>
            </div>

            <!-- Description -->
            <div class="mb-5">
              <h4 class="mb-3 fw-bold">Description</h4>
              <p class="text-muted">
                Stripe is looking for Social Media Marketing expert to help
                manage our online networks. You will be responsible for
                monitoring our social media channels, creating content, finding
                effective ways to engage the community and incentivize others to
                engage on our channels.
              </p>
            </div>

            <!-- Responsibilities -->
            <div class="mb-5">
              <h4 class="mb-3 fw-bold">Responsibilities</h4>
              <ul class="list-unstyled">
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >Community engagement to ensure that is supported and
                    actively represented online</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >Focus on social media content development and
                    publication</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Marketing and strategy support</span>
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >Stay on top of trends on social media platforms, and
                    suggest content ideas to the team</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Engage with online communities</span>
                </li>
              </ul>
            </div>

            <!-- Who You Are -->
            <div class="mb-5">
              <h4 class="mb-3 fw-bold">Who You Are</h4>
              <ul class="list-unstyled">
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >You get energy from people and building the ideal work
                    environment</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >You have a sense for beautiful spaces and office
                    experiences</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >You are a confident office manager, ready for added
                    responsibilities</span
                  >
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>You're detail-oriented and creative</span>
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span
                    >You're a growth marketer and know how to run
                    campaigns</span
                  >
                </li>
              </ul>
            </div>

            <!-- Nice-To-Haves -->
            <div class="mb-5">
              <h4 class="mb-3 fw-bold">Nice-To-Haves</h4>
              <ul class="list-unstyled">
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Fluent in English</span>
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Project management skills</span>
                </li>
                <li class="d-flex align-items-start mb-2">
                  <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
                  <span>Copy editing skills</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-4">
            <!-- About this role -->
            <div class="card border-0 shadow-sm">
              <div class="card-body p-4">
                <h6 class="mb-3 fw-bold">About this role</h6>
                <div class="mb-3">
                  <div
                    class="d-flex justify-content-between align-items-center mb-1"
                  >
                    <span class="fw-medium">5 applied</span>
                    <span class="text-muted">of 10 capacity</span>
                  </div>
                  <div class="progress" style="height: 6px">
                    <div
                      class="progress-bar bg-success"
                      style="width: 50%"
                    ></div>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-6">
                    <div class="text-muted small">Apply Before</div>
                    <div class="fw-medium">July 31, 2021</div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Job Posted On</div>
                    <div class="fw-medium">July 1, 2021</div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Job Type</div>
                    <div class="fw-medium">Full-Time</div>
                  </div>
                  <div class="col-6">
                    <div class="text-muted small">Salary</div>
                    <div class="fw-medium">$75k-$85k USD</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Categories -->
            <div class="mt-4">
              <h6 class="mb-3 fw-bold">Categories</h6>
              <div class="d-flex flex-wrap gap-2">
                <span
                  class="badge bg-warning-subtle text-warning border border-warning px-3 py-2"
                  >Marketing</span
                >
                <span
                  class="badge bg-primary-subtle text-primary border border-primary px-3 py-2"
                  >Design</span
                >
              </div>
            </div>

            <!-- Required Skills -->
            <div class="mt-4">
              <h6 class="mb-3 fw-bold">Required Skills</h6>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge bg-primary-subtle text-primary px-3 py-2"
                  >Project Management</span
                >
                <span class="badge bg-primary-subtle text-primary px-3 py-2"
                  >Copywriting</span
                >
                <span class="badge bg-primary-subtle text-primary px-3 py-2"
                  >English</span
                >
                <span class="badge bg-primary-subtle text-primary px-3 py-2"
                  >Social Media Marketing</span
                >
                <span class="badge bg-primary-subtle text-primary px-3 py-2"
                  >Copy Editing</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics Tab -->
      <div v-else-if="activeTab === 'analytics'">
        <JobAnalytics />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import ApplicantsPipeline from "./ApplicantsPipeline.vue";
import JobAnalytics from "./JobAnalytics.vue";

const goBack = inject("goBack");
const activeTab = ref("applicants");

const handleViewSwitch = (viewType) => {
  console.log("Switching to view:", viewType);
  // Handle view switching logic here
};
</script>

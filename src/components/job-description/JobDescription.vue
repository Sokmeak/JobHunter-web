<template>
  <div class="container py-4">
    <!-- Breadcrumb Navigation -->
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" class="text-decoration-none">Home</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#" class="text-decoration-none">Companies</a>
        </li>
        <li class="breadcrumb-item">
          <a href="#" class="text-decoration-none">{{ currentJob.company }}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {{ currentJob.title }}
        </li>
      </ol>
    </nav>

    <!-- Job Header Section -->
    <div class="job-header bg-white rounded-4 p-4 shadow-sm mb-4">
      <div class="row align-items-center">
        <div class="col-md-8 d-flex align-items-center">
          <div
            class="company-logo rounded-3 d-flex align-items-center justify-content-center me-4"
            :class="!currentJob.companyLogo ? 'bg-secondary text-primary' : ''"
          >
            <span v-if="!currentJob.companyLogo" class="fs-4 fw-bold">{{
              currentJob.company.charAt(0)
            }}</span>
            <img
              v-else
              :src="currentJob.companyLogo"
              :alt="`${currentJob.company} logo`"
              class="img-fluid rounded-3"
              width="60"
              height="60"
            />
          </div>
          <div>
            <h1 class="fs-3 fw-bold mb-1">{{ currentJob.title }}</h1>
            <div class="d-flex flex-wrap align-items-center text-muted">
              <span>{{ currentJob.company }}</span>
              <span class="mx-2">•</span>
              <span>{{ currentJob.location }}</span>
              <span class="mx-2">•</span>
              <span>{{ currentJob.type }}</span>
            </div>
          </div>
        </div>
        <div
          class="col-md-4 text-md-end mt-3 mt-md-0 d-flex align-items-center justify-content-md-end"
        >
          <button
            class="btn btn-outline-secondary rounded-pill me-3 d-flex align-items-center"
            title="Share job"
          >
            <i class="bi bi-share me-2"></i>
            <span class="d-none d-sm-inline">Share</span>
          </button>
          <button
            class="btn btn-primary rounded-pill px-4 py-2 position-relative overflow-hidden"
            @click="showApplicationModal"
            @mousedown="addRippleEffect"
          >
            <span
              class="ripple-effect"
              v-if="rippleActive"
              :style="rippleStyle"
            ></span>
            <span class="position-relative">Apply Now</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <!-- Left Column - Job Details -->
      <div class="col-lg-8">
        <!-- Description Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Description</h2>
          <p class="text-muted mb-0">
            {{
              currentJob.description ||
              "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social-media channels, creating content, finding effective ways to engage the community and contribute ideas to engage our channels."
            }}
          </p>
        </div>

        <!-- Responsibilities Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Responsibilities</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(responsibility, index) in responsibilities"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ responsibility }}</span>
            </li>
          </ul>
        </div>

        <!-- Who You Are Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Who You Are</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(trait, index) in whoYouAre"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ trait }}</span>
            </li>
          </ul>
        </div>

        <!-- Nice-To-Haves Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Nice-To-Haves</h2>
          <ul class="list-unstyled mb-0">
            <li
              v-for="(skill, index) in niceToHaves"
              :key="index"
              class="d-flex mb-3"
            >
              <div class="me-3 text-primary">
                <i class="bi bi-check-circle-fill"></i>
              </div>
              <span class="text-muted">{{ skill }}</span>
            </li>
          </ul>
        </div>

        <!-- Perks & Benefits Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Perks & Benefits</h2>
          <p class="text-muted mb-4">
            This job comes with several perks and benefits
          </p>

          <div class="row g-4">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="col-md-6"
            >
              <div class="d-flex">
                <div
                  class="benefit-icon rounded-circle p-3 text-primary me-3 d-flex align-items-center justify-content-center"
                >
                  <i :class="`bi ${benefit.icon}`"></i>
                </div>
                <div>
                  <h3 class="fs-6 fw-bold mb-1">{{ benefit.title }}</h3>
                  <p class="text-muted small mb-0">
                    {{ benefit.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Section -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <div class="d-flex align-items-center mb-3">
            <div
              class="company-logo-sm rounded-3 d-flex align-items-center justify-content-center me-3 bg-secondary text-primary"
            >
              <span class="fw-bold">{{ currentJob.company.charAt(0) }}</span>
            </div>
            <h2 class="fs-5 fw-bold mb-0">{{ currentJob.company }}</h2>
          </div>
          <p class="text-muted mb-3">
            <a href="#" class="text-decoration-none"
              >Read more about {{ currentJob.company }}</a
            >
          </p>
          <p class="text-muted mb-4">
            {{ currentJob.company }} is a technology company that builds
            economic infrastructure for the internet. Businesses of every
            size—from new startups to public companies—use our software to
            accept payments and manage their businesses online.
          </p>
          <div class="row g-3">
            <div class="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="Office"
                class="img-fluid rounded-3 shadow-sm"
              />
            </div>
            <div class="col-md-6">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dGVhbXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                alt="Team"
                class="img-fluid rounded-3 shadow-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column - Job Meta -->
      <div class="col-lg-4">
        <!-- Job Meta Info -->
        <div
          class="bg-white rounded-4 p-4 shadow-sm mb-4 sticky-lg-top"
          style="top: 20px; z-index: 100"
        >
          <h2 class="fs-5 fw-bold mb-3">About this role</h2>
          <div
            class="applied-section bg-success-subtle text-success rounded-3 p-3 d-flex align-items-center justify-content-between mb-4"
          >
            <span class="fw-medium"
              ><i class="bi bi-people-fill me-2"></i>5 applied</span
            >
            <span class="badge bg-success rounded-pill">Low competition</span>
          </div>

          <div class="job-meta">
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-calendar-event me-2"></i>Apply Before</span
              >
              <span class="fw-medium">{{
                formatDate(currentJob.deadline)
              }}</span>
            </div>
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-calendar-check me-2"></i>Job Posted On</span
              >
              <span class="fw-medium">{{
                formatDate(currentJob.postedDate)
              }}</span>
            </div>
            <div class="d-flex justify-content-between py-3 border-bottom">
              <span class="text-muted"
                ><i class="bi bi-briefcase me-2"></i>Job Type</span
              >
              <span class="fw-medium">{{ currentJob.type }}</span>
            </div>
            <div class="d-flex justify-content-between py-3">
              <span class="text-muted"
                ><i class="bi bi-cash-coin me-2"></i>Salary</span
              >
              <span class="fw-medium">{{ currentJob.salary }}</span>
            </div>
          </div>

          <button
            class="btn btn-primary w-100 rounded-pill mt-4 py-2 position-relative overflow-hidden"
            @click="showApplicationModal"
            @mousedown="addRippleEffect"
          >
            <span
              class="ripple-effect"
              v-if="rippleActive"
              :style="rippleStyle"
            ></span>
            <span class="position-relative">Apply for this position</span>
          </button>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Categories</h2>
          <div class="d-flex flex-wrap gap-2">
            <span
              class="badge bg-warning-subtle text-warning rounded-pill px-3 py-2"
              >Marketing</span
            >
            <span
              class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2"
              >Design</span
            >
          </div>
        </div>

        <!-- Required Skills -->
        <div class="bg-white rounded-4 p-4 shadow-sm mb-4">
          <h2 class="fs-5 fw-bold mb-3">Required Skills</h2>
          <div class="d-flex flex-wrap gap-2">
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"
              >Project Management</span
            >
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"
              >Copywriting</span
            >
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"
              >Social Media Marketing</span
            >
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"
              >English</span
            >
            <span class="badge bg-light text-dark rounded-pill px-3 py-2"
              >Copy Editing</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Similar Jobs Section -->
    <div class="similar-jobs mt-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fs-5 fw-bold mb-0">Similar Jobs</h2>
        <div class="d-flex align-items-center">
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-2 scroll-btn scroll-left"
            aria-label="Scroll left"
            @click="scrollJobsLeft"
          >
            <i class="bi bi-chevron-left"></i>
          </button>
          <button
            class="btn btn-sm btn-outline-primary rounded-circle me-3 scroll-btn scroll-right"
            aria-label="Scroll right"
            @click="scrollJobsRight"
          >
            <i class="bi bi-chevron-right"></i>
          </button>
          <a
            href="#"
            class="text-primary text-decoration-none d-flex align-items-center"
          >
            Show all jobs
            <i class="bi bi-arrow-right ms-1"></i>
          </a>
        </div>
      </div>

      <div class="position-relative">
        <div class="jobs-scroll-container" ref="jobsContainer">
          <div class="d-flex flex-nowrap">
            <div
              class="job-card-wrapper"
              v-for="(job, index) in similarJobs"
              :key="index"
            >
              <job-card :job="job" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Application Modal -->
    <job-application-modal
      :is-visible="isModalVisible"
      :job="currentJob"
      :form-subtitle="`The following is required and will only be shared with ${currentJob.company}`"
      @close="hideApplicationModal"
      @submit-success="handleApplicationSuccess"
      @submit-error="handleApplicationError"
      @view-status="viewApplicationStatus"
    />

    <simple-status-modal
      :is-visible="showStatusModal"
      :is-loading="isLoadingStatus"
      :status="applicationStatus"
      :application-id="currentApplicationId"
      :error-message="errorMessage"
      @close="closeStatusModal"
      @retry="retryApplication"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import JobCard from "../landing/JobCard.vue";
import SimpleStatusModal from "./SimpleStatusModal.vue";
import JobApplicationModal from "./JobApplicationModel.vue";
import { fetchJobById } from "../services/jobService";
import { getApplicationStatus } from "../services/applicationService";
import {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
} from "../services/toastService";

// State
const isModalVisible = ref(false);
const rippleActive = ref(false);
const rippleStyle = reactive({
  left: "0px",
  top: "0px",
});
const isLoading = ref(true);
const applicationStatus = ref("loading"); // 'loading', 'success', 'error'
const errorMessage = ref("");
const showStatusModal = ref(false);
const isLoadingStatus = ref(false);
const currentApplicationId = ref("");

// Default job data (will be replaced with API data)
const currentJob = reactive({
  id: "job-1",
  title: "Social Media Assistant",
  company: "Stripe",
  location: "Paris, France",
  type: "Full-Time",
  companyLogo:
    "https://images.unsplash.com/photo-1580893246395-52aead8960dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=64&h=64&q=80",
  description:
    "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social-media channels, creating content, finding effective ways to engage the community and contribute ideas to engage our channels.",
  salary: "€70k-€85k USD",
  postedDate: "2023-07-01",
  deadline: "2023-07-31",
});

// Job details data
const responsibilities = ref([
  "Community engagement to ensure that is supported and actively represented online",
  "Focus on social media content development and publication",
  "Marketing and strategy support",
  "Stay on top of trends on social media platforms, and suggest content ideas to the team",
  "Engage with online communities",
]);

const whoYouAre = ref([
  "You get energy from people and building the ideal work environment",
  "You have a sense for beautiful spaces and office experiences",
  "You are a confident office manager, ready for added responsibilities",
  "You're detail-oriented and creative",
  "You're a growth marketer and know how to run campaigns",
]);

const niceToHaves = ref([
  "Fluent in English",
  "Project management skills",
  "Copy editing skills",
]);

const benefits = ref([
  {
    title: "Full Healthcare",
    description:
      "We believe in treating communities and that starts with our team staying happy and healthy.",
    icon: "bi-heart-fill",
  },
  {
    title: "Unlimited Vacation",
    description:
      "We believe you should have a flexible schedule that makes space for family, wellness, and fun.",
    icon: "bi-cloud-sun-fill",
  },
  {
    title: "Skill Development",
    description:
      "We believe in always learning and leveling up our skills. Whether it's a course or coaching.",
    icon: "bi-mortarboard-fill",
  },
  {
    title: "Team Summits",
    description:
      "Every 6 months we have a full team off-site where all team members are flown in for a week of connection and planning for the quarter.",
    icon: "bi-people-fill",
  },
  {
    title: "Remote Working",
    description:
      "You know how you perform your best work. Work from your home, a coffee shop, or anywhere when you feel like it.",
    icon: "bi-house-fill",
  },
  {
    title: "Commuter Benefits",
    description:
      "We're grateful for all the time and energy our employees put into getting to work every day.",
    icon: "bi-clock-fill",
  },
  {
    title: "We give back",
    description:
      "We anonymously match any donations team members make (up to $1,000) so they can support the organizations they care about",
    icon: "bi-cash-coin",
  },
]);
const similarJobs = ref([
  {
    title: "Email Marketing",
    company: "Figma",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    description:
      "Looking for a mid-level Email Marketing Manager to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
    description: "Looking for a Brand Designer to help with our rebrand.",
    tags: ["Design"],
  },
  {
    title: "Email Marketing",
    company: "Webflow",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAaVBMVEUUbvUAaPUAa/UMbPWTs/mOsPmSsvlfkfdEg/ZIhfYAZ/VmlvdMh/b///+owPoAV/Ti6/11n/htmviyx/uEqfnv9P5wnfjr8P4AX/Qnd/b2+f/V4f00e/Y7fvbE1fy7zvsAY/QccfWfu/qWWPS4AAAAm0lEQVR4Ad2MAQ7CIAxFSwtDkU6nm0Onyrz/IaWJMjCeYC/Ja5qXfFgdKoFAyQQoDxVRG9NYtdFGb92uMUb7XIk40e4PyZ1jAZeI8uuj2J7EvYI6mkF8Fo0BoJ4dOdsiFBVVuFz5yxSgjOHW8sKdyob84SF6RvgX7SAuU47TrOW8XB1JFm2YWYgENb2PEcl3CY/wg0IxqQTCGnkDnMkKhb6wqhEAAAAASUVORK5CYII=",
    description:
      "Looking for a mid-level Email Marketing Manager to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Visual Designer",
    company: "Spotify",
    location: "New York, NY",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    description: "Looking for a Visual Designer to join our team.",
    tags: ["Design"],
  },
  {
    title: "Product Designer",
    company: "Shopify",
    location: "Remote",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAn1BMVEX////1+PGuzoGawk+ixmPk7dX7/Pnx9uuQvCygxV2QvDrP4bX8/fybwlfp8d/s8+O404/K3qzC2Z7S47ve6sumyGqpyHra4taVv0eTvkGQukZIgyi+15iVv0hcjD5ViS5xmlhik07k6uKUv0dejj5JgxvK18WtzXeuwqSEtgq00ISOrnuKuR+PuzVfjkC50456oWhBgAi8zbSctosfcwAVHUP+AAABXElEQVR4AW3ShWLCMBAA0HahIYS6bBdWF7SC/f+3LckS/KD6aifGPcwvNLOw8THmxDIXhC4/me24BvJ8a+Z+wCA0wqURRHHy/fNq2LFxYs99oGz1+6pWasSIvzLLYJUXZVU/3pgmiDSQAQDHtu3WN4o3jApgrFFYbLWZO8aF0mS/nylsDxrdHrilpnjG8I9jqTEmACr5iUrkYesUB2AbUaM5dhqFnalwYjDEhpFSyk2jzjUBIB7fsEyn8pALyiSa+wFuqHPBNAMaiL2I3rA9ql71In9L7C6HTOFYqTQFNvJejDS2BZYYEQBGMyIy3TCNp1piSAE2S9YH8sP1Y1Uum0Z8j+mJKrP7Y88SF5mogYyUgsb2Is/IZgUmv89/SGWUuWCScaUEoUGaxlGg1/c9zWTAA7adzAXP4zBBpCeskRdwHMe8uD6MEXbjNIG+Hxo+YKfieNb2eEk0JQcNf/qmMR8K5c7QAAAAAElFTkSuQmCC",
    description: "Looking for a Product Designer to join our team.",
    tags: ["Design"],
  },
  {
    title: "Lead Designer",
    company: "Dribbble",
    location: "Remote",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAUVBMVEX/q+fYe72zSJS3T5m4UJq1TJfkisr/r+v/sezafsD6peHBXaSyR5T/rOjTdbj/renGY6nnjs3fhMTwmdf0ntv/ruq/WqLPcLTslNO8VZ7La69lEsuzAAABPklEQVR4AWWRB5aFMAhFI4Ehk2rU6Nf9L3TANt/js+Klay51YBGRfvi03S/hDdkHEBo7p1biDHhDtbsoFDqJLakXdkMVV6VxYDciIVprHnQEja1Z61uazENtp0R6m30xraS7amE3KJCwuOj37uPZOWbHbap5PRl+WN0JgObQ92EFebO4i3wzqt1xFx5BWpEy7/ByPgDEvv4KjT4pXGZNp2ekkKtxrUlJ6lghu+LHj2jyze2tN+2YGrdjhFRE6R6pKNx6BPNScr7XBcn1QjxucPT4gm7qIx2E4Jm2FF35kZIWX54/ZSVFsG4WaeNHyiFaRXN1I6GdvyEvoJWwckleXql8sU0ZLElnb/IeTfpnpCmrOyz18xfkDNrk1E5ztQjTCXlQhtr8C5ZJmb3ZI20TR/E82bOh1hEiVb7ZMUozf5iDED8WsD32AAAAAElFTkSuQmCC",
    description: "Looking for a Lead Designer to join our team.",
    tags: ["Design", "Leadership"],
  },
  {
    title: "Brand Strategist",
    company: "Behance",
    location: "New York, NY",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAeFBMVEUFWP8AVv8ATP8ASv8AUf+lt/+ywf9lhf8ARv8AU/8AQP/y9f////91kv/q8P8ARP/S2v9ujf/l7P8ASP8yZv8ATv+5xv9nh//M1f+Spv/BzP/Y3/+4xP+ZrP+su/8AJv8AN/8APf/f5v8AL/8oX/88af9Qd/+Kof8IPKxZAAAAvUlEQVR4Ac3RRQKDMAAAwZLgLO5ab///w7qgZxZnLpHNcspsa0UhHwl1CqWmP9IM8/5hPfpD2+GVLlX38fT8P/QIQteNIFYUVUnSB/1h5qdmDqq6KYDS76Mt0oratqBuoBX/yCMnjjuq7S6BHkZZljkQR9RVlYGh/mG2l7ENbYQXRdEhynvoq+rRoykoj/bxdB5OJdShzME4lSDHi1Cbfseji/pF2WWPOuM+vfjcdldVnVl4KxXp8patFhe6ATwRD2y5uYPGAAAAAElFTkSuQmCC",
    description: "Looking for a Brand Strategist to join our team.",
    tags: ["Marketing"],
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    location: "San Francisco, CA",
    type: "Full Time",
    logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA/0lEQVR4AbXPIazCMACE4d+L2qoZFEGSIGcRc/gJJB5XMzGJmK9EN0HMi+qaibkKVF1txdQe4g0YzPK5yyWXHL9TaPNQ89LojH87N1rbJcXkMF4Fk31UMrf34hm14KUeoQxGArALHTMuQD2cAWQfJXOpgTbksGr9ng8qluShJTPhyCdx63POg7rEim95ZyR68I1ggQpnCEGwyPicw6hZtPEGmnhkycqOio1zm6XuFtyw5XDXfGvuau0dXHzJp8pfBPuhIXO9ZK5ILUCdSvLYMpc6ASBtl3EaC97I4KaFaOCaBE9Zn5jUsVqR2vcTJZO1DdbGoZryVp94Ka/mQfE7f2T3df0WBhLDAAAAAElFTkSuQmCC",
    description: "Looking for a Data Analyst to join our team.",
    tags: ["Technology"],
  },
]);

// Scroll methods for similar jobs
const jobsContainer = ref(null);

const scrollJobsRight = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }
};

const scrollJobsLeft = () => {
  if (jobsContainer.value) {
    const scrollAmount = jobsContainer.value.clientWidth * 0.8;
    jobsContainer.value.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
};

// Methods
const fetchJobData = async () => {
  try {
    isLoading.value = true;
    const jobData = await fetchJobById("job-1");

    // Update the reactive job object with fetched data
    Object.assign(currentJob, jobData);
  } catch (error) {
    console.error("Error fetching job data:", error);
    showErrorToast("Failed to load job details. Please refresh the page.");
  } finally {
    isLoading.value = false;
  }
};

// Modal control functions
const showApplicationModal = () => {
  isModalVisible.value = true;
  // Prevent body scrolling when modal is open
  document.body.style.overflow = "hidden";
};

const hideApplicationModal = () => {
  isModalVisible.value = false;
  // Restore body scrolling when modal is closed
  document.body.style.overflow = "";
};

// Add ripple effect to the Apply button
const addRippleEffect = (event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  rippleStyle.left = `${x}px`;
  rippleStyle.top = `${y}px`;
  rippleActive.value = true;

  setTimeout(() => {
    rippleActive.value = false;
  }, 600);
};

// Handle application submission results
const handleApplicationSuccess = (data) => {
  currentApplicationId.value = data.applicationId;
  applicationStatus.value = "success";
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  showSuccessToast(
    `Application submitted successfully! Reference ID: ${data.applicationId}`
  );
};

const handleApplicationError = (error) => {
  errorMessage.value =
    error.message || "Failed to submit application. Please try again.";
  applicationStatus.value = "error";
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  showErrorToast("Failed to submit application. Please try again.");
};

// Application status modal functions
const viewApplicationStatus = async (data) => {
  currentApplicationId.value = data.applicationId;
  showStatusModal.value = true;
  document.body.style.overflow = "hidden";
  await fetchApplicationStatus();
};

const fetchApplicationStatus = async () => {
  if (!currentApplicationId.value) return;

  try {
    isLoadingStatus.value = true;
    const statusData = await getApplicationStatus(currentApplicationId.value);
    applicationStatus.value = statusData.status || "success";
  } catch (error) {
    console.error("Error fetching application status:", error);
    showErrorToast("Failed to load application status. Please try again.");
  } finally {
    isLoadingStatus.value = false;
  }
};

const closeStatusModal = () => {
  showStatusModal.value = false;
  document.body.style.overflow = "";

  // Reset status after closing
  setTimeout(() => {
    applicationStatus.value = "loading";
    errorMessage.value = "";
  }, 300);
};

const retryApplication = () => {
  // Reset status and trigger resubmission
  applicationStatus.value = "loading";
  isLoadingStatus.value = true;

  // Simulate resubmission (replace with your actual submission logic)
  setTimeout(() => {
    // Simulate success
    isLoadingStatus.value = false;
    applicationStatus.value = "success";
    currentApplicationId.value = "APP-" + Math.floor(Math.random() * 10000);
    showSuccessToast("Application resubmitted successfully!");
  }, 1500);
};

const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Lifecycle hooks
onMounted(() => {
  // Fetch job data when component mounts
  fetchJobData();

  // Add toast container if it doesn't exist
  if (!document.getElementById("toast-container")) {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    document.body.appendChild(toastContainer);
  }
});
</script>

<style scoped>
:root {
  --primary-color: #4640de;
  --bg-primary-color: #4640de;
  --secondary-color: #ccccf5;
  --tertiary-color: #e7f6fd;
  --cyan-accent-color: #26a4ff;
  --red-accent-color: #ff6550;
  --green-accent-color: #56cdad;
  --purple-accent-color: #7b61ff;
  --yellow-accent-color: #ffb836;
  --neutral-color: #25324b;
}

.job-listing-container {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.company-logo {
  width: 60px;
  height: 60px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.company-logo-sm {
  width: 40px;
  height: 40px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.benefit-icon {
  width: 40px;
  height: 40px;
  background-color: var(--tertiary-color);
}

/* Bootstrap overrides */
.btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #3935b8;
  border-color: #3935b8;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(70, 64, 222, 0.2);
}

.btn-outline-secondary {
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

.bg-tertiary {
  background-color: var(--tertiary-color) !important;
}

.bg-primary-subtle {
  background-color: rgba(70, 64, 222, 0.1) !important;
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-warning-subtle {
  background-color: rgba(255, 184, 54, 0.1) !important;
}

.text-warning {
  color: var(--yellow-accent-color) !important;
}

/* Success color overrides */
.bg-success-subtle {
  background-color: rgba(86, 205, 173, 0.1) !important;
}

.text-success {
  color: var(--green-accent-color) !important;
}

/* Add these new styles for the ripple effect on the Apply button */
.btn-primary {
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease, transform 0.3s ease,
    box-shadow 0.3s ease;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  animation: ripple 0.6s linear;
  transform: scale(0);
  pointer-events: none;
}

@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}

/* Enhanced styling for job details */
.job-header {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.job-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
}

.badge {
  font-weight: 500;
  letter-spacing: 0.3px;
}

.breadcrumb-item + .breadcrumb-item::before {
  color: var(--primary-color);
}

.breadcrumb-item a {
  color: var(--primary-color);
  transition: color 0.3s ease;
}

.breadcrumb-item a:hover {
  color: #3935b8;
  text-decoration: underline !important;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .job-meta > div {
    flex-direction: column;
    align-items: flex-start;
  }

  .job-meta > div span:last-child {
    margin-top: 4px;
  }
}

/* Horizontal scrolling for similar jobs */
.jobs-scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  padding-bottom: 10px;
}

.jobs-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.job-card-wrapper {
  flex: 0 0 auto;
  width: 100%;
  padding-right: 16px;
}

@media (min-width: 576px) {
  .job-card-wrapper {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .job-card-wrapper {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .job-card-wrapper {
    width: 33.333%;
  }
}

@media (min-width: 1200px) {
  .job-card-wrapper {
    width: 25%;
  }
}

.scroll-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.scroll-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.scroll-btn:focus {
  box-shadow: 0 0 0 0.25rem rgba(70, 64, 222, 0.25);
}
</style>

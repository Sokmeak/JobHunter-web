<template>
  <div class="applicant-details">
    <!-- Header with Back Button -->
    <div class="d-flex align-items-center mb-4">
      <button
        class="btn btn-link text-dark p-0 me-3"
        @click="goBackToApplicants"
      >
        <i class="bi bi-arrow-left fs-4"></i>
      </button>
      <h2 class="mb-0">Applicant Details</h2>
    </div>

    <div class="row">
      <div class="col-lg-8">
        <!-- Applicant Profile Card -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <div class="d-flex align-items-start justify-content-between mb-4">
              <div class="d-flex align-items-center">
                <img
                  :src="applicant.avatar"
                  :alt="applicant.name"
                  class="rounded-circle me-4"
                  style="width: 80px; height: 80px; object-fit: cover"
                />
                <div>
                  <h3 class="mb-1">{{ applicant.name }}</h3>
                  <p class="text-muted mb-2">{{ applicant.email }}</p>
                  <div class="d-flex align-items-center">
                    <i class="bi bi-star-fill text-warning me-1"></i>
                    <span class="fw-medium me-3">{{ applicant.score }}</span>
                    <span
                      class="badge px-3 py-2"
                      :class="getStageClass(applicant.stage)"
                    >
                      {{ applicant.stage }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-success">
                  <i class="bi bi-calendar me-1"></i>Schedule Interview
                </button>
                <button class="btn btn-primary">
                  <i class="bi bi-check-circle me-1"></i>Hire
                </button>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-md-6">
                <h6 class="text-muted mb-2">Applied For</h6>
                <p class="mb-0">{{ applicant.jobRole }}</p>
              </div>
              <div class="col-md-6">
                <h6 class="text-muted mb-2">Applied Date</h6>
                <p class="mb-0">{{ applicant.appliedDate }}</p>
              </div>
              <div class="col-md-6">
                <h6 class="text-muted mb-2">Phone</h6>
                <p class="mb-0">{{ applicant.phone }}</p>
              </div>
              <div class="col-md-6">
                <h6 class="text-muted mb-2">Location</h6>
                <p class="mb-0">{{ applicant.location }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Resume Section -->
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-4">
            <h5 class="mb-3">Resume</h5>
            <div
              class="d-flex align-items-center justify-content-between p-3 bg-light rounded"
            >
              <div class="d-flex align-items-center">
                <i class="bi bi-file-earmark-pdf text-danger fs-3 me-3"></i>
                <div>
                  <h6 class="mb-1">{{ applicant.name }}_Resume.pdf</h6>
                  <small class="text-muted">2.3 MB</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-eye me-1"></i>View
                </button>
                <button class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-download me-1"></i>Download
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Cover Letter Section -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="mb-3">Cover Letter</h5>
            <p class="text-muted">{{ applicant.coverLetter }}</p>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <!-- Interview Timeline -->
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="mb-4">Interview Timeline</h5>
            <div class="timeline">
              <div
                v-for="(event, index) in applicant.timeline"
                :key="index"
                class="timeline-item mb-3"
              >
                <div class="d-flex align-items-start">
                  <div class="timeline-marker me-3">
                    <div
                      class="rounded-circle d-flex align-items-center justify-content-center"
                      :class="
                        event.completed
                          ? 'bg-success text-white'
                          : 'bg-light text-muted'
                      "
                      style="width: 32px; height: 32px"
                    >
                      <i :class="event.icon" class="small"></i>
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6
                      class="mb-1"
                      :class="{ 'text-muted': !event.completed }"
                    >
                      {{ event.title }}
                    </h6>
                    <p class="text-muted small mb-0">{{ event.date }}</p>
                    <p v-if="event.description" class="text-muted small mb-0">
                      {{ event.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

const navigate = inject("navigate");

const applicant = ref({
  id: 1,
  name: "Jake Gyll",
  email: "jake.gyll@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  score: "4.5",
  stage: "Interview",
  appliedDate: "13 July, 2021",
  jobRole: "Senior UI/UX Designer",
  avatar: "/placeholder.svg?height=80&width=80&query=professional+man+jake",
  coverLetter:
    "Dear Hiring Manager, I am writing to express my strong interest in the Senior UI/UX Designer position at your company. With over 5 years of experience in user experience design and a passion for creating intuitive digital experiences, I believe I would be a valuable addition to your team. My background includes working with cross-functional teams to deliver user-centered design solutions that drive business results.",
  timeline: [
    {
      title: "Application Submitted",
      date: "July 13, 2021",
      icon: "bi bi-file-earmark",
      completed: true,
      description: "Application received and under review",
    },
    {
      title: "Initial Screening",
      date: "July 15, 2021",
      icon: "bi bi-person-check",
      completed: true,
      description: "Passed initial screening",
    },
    {
      title: "Technical Interview",
      date: "July 20, 2021",
      icon: "bi bi-laptop",
      completed: false,
      description: "Scheduled for technical assessment",
    },
    {
      title: "Final Interview",
      date: "TBD",
      icon: "bi bi-people",
      completed: false,
      description: "Final round with team leads",
    },
  ],
});

const getStageClass = (stage) => {
  switch (stage.toLowerCase()) {
    case "interview":
      return "bg-warning-subtle text-warning border border-warning";
    case "shortlisted":
      return "bg-primary-subtle text-primary border border-primary";
    case "declined":
      return "bg-danger-subtle text-danger border border-danger";
    case "hired":
      return "bg-success-subtle text-success border border-success";
    case "interviewed":
      return "bg-info-subtle text-info border border-info";
    default:
      return "bg-secondary-subtle text-secondary border border-secondary";
  }
};

const goBackToApplicants = () => {
  navigate("all-applicants");
};
</script>

<style scoped>
.timeline-item:not(:last-child) .timeline-marker::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 32px;
  width: 2px;
  height: 40px;
  background-color: #e9ecef;
  transform: translateX(-50%);
}

.timeline-marker {
  position: relative;
}
</style>

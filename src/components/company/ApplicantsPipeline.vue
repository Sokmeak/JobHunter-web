<template>
  <div class="applicants-pipeline">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0 fw-bold">Total Applicants: 19</h2>

      <div class="d-flex align-items-center gap-3">
        <!-- Search Bar -->
        <div class="position-relative" style="width: 300px">
          <i
            class="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          ></i>
          <input
            type="text"
            class="form-control ps-5"
            placeholder="Search Applicants"
            v-model="searchQuery"
          />
        </div>

        <!-- Filter Button -->
        <button class="btn btn-outline-secondary d-flex align-items-center">
          <i class="bi bi-funnel me-2"></i>Filter
        </button>

        <!-- View Toggle -->
        <div class="btn-group" role="group">
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('switchView', 'pipeline')"
          >
            Pipeline View
          </button>
          <button
            type="button"
            class="btn btn-outline-secondary"
            @click="$emit('switchView', 'table')"
          >
            Table View
          </button>
        </div>
      </div>
    </div>

    <!-- Pipeline Columns -->
    <div class="row g-4">
      <!-- In Review Column -->
      <div class="col-lg-3">
        <div class="pipeline-column">
          <div
            class="column-header d-flex justify-content-between align-items-center mb-3 p-3 rounded-top"
            style="background-color: #fef3c7; border-left: 4px solid #f59e0b"
          >
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle me-2"
                style="width: 8px; height: 8px; background-color: #f59e0b"
              ></div>
              <span class="fw-medium">In Review</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="badge bg-warning-subtle text-warning me-2">10</span>
              <button class="btn btn-sm btn-link text-muted p-0">
                <i class="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <div class="column-content">
            <div
              v-for="applicant in getApplicantsByStage('In Review')"
              :key="applicant.id"
              class="applicant-card card border-0 shadow-sm mb-3"
            >
              <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                  <img
                    :src="applicant.avatar"
                    :alt="applicant.name"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{{ applicant.name }}</h6>
                    <button
                      class="btn btn-link text-primary p-0 small"
                      @click="viewProfile(applicant.id)"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div class="row g-2 small text-muted">
                  <div class="col-6">
                    <div>Applied on</div>
                    <div class="fw-medium text-dark">
                      {{ applicant.appliedDate }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div>Score</div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-star-fill text-warning me-1"></i>
                      <span class="fw-medium text-dark">{{
                        applicant.score
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shortlisted Column -->
      <div class="col-lg-3">
        <div class="pipeline-column">
          <div
            class="column-header d-flex justify-content-between align-items-center mb-3 p-3 rounded-top"
            style="background-color: #ddd6fe; border-left: 4px solid #8b5cf6"
          >
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle me-2"
                style="width: 8px; height: 8px; background-color: #8b5cf6"
              ></div>
              <span class="fw-medium">Shortlisted</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="badge bg-primary-subtle text-primary me-2">8</span>
              <button class="btn btn-sm btn-link text-muted p-0">
                <i class="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <div class="column-content">
            <div
              v-for="applicant in getApplicantsByStage('Shortlisted')"
              :key="applicant.id"
              class="applicant-card card border-0 shadow-sm mb-3"
            >
              <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                  <img
                    :src="applicant.avatar"
                    :alt="applicant.name"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{{ applicant.name }}</h6>
                    <button
                      class="btn btn-link text-primary p-0 small"
                      @click="viewProfile(applicant.id)"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div class="row g-2 small text-muted">
                  <div class="col-6">
                    <div>Applied on</div>
                    <div class="fw-medium text-dark">
                      {{ applicant.appliedDate }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div>Score</div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-star-fill text-warning me-1"></i>
                      <span class="fw-medium text-dark">{{
                        applicant.score
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Interview Column -->
      <div class="col-lg-3">
        <div class="pipeline-column">
          <div
            class="column-header d-flex justify-content-between align-items-center mb-3 p-3 rounded-top"
            style="background-color: #dbeafe; border-left: 4px solid #3b82f6"
          >
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle me-2"
                style="width: 8px; height: 8px; background-color: #3b82f6"
              ></div>
              <span class="fw-medium">Interview</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="badge bg-info-subtle text-info me-2">11</span>
              <button class="btn btn-sm btn-link text-muted p-0">
                <i class="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <div class="column-content">
            <div
              v-for="applicant in getApplicantsByStage('Interview')"
              :key="applicant.id"
              class="applicant-card card border-0 shadow-sm mb-3"
            >
              <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                  <img
                    :src="applicant.avatar"
                    :alt="applicant.name"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{{ applicant.name }}</h6>
                    <button
                      class="btn btn-link text-primary p-0 small"
                      @click="viewProfile(applicant.id)"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div class="row g-2 small text-muted">
                  <div class="col-6">
                    <div>Applied on</div>
                    <div class="fw-medium text-dark">
                      {{ applicant.appliedDate }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div>Score</div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-star-fill text-warning me-1"></i>
                      <span class="fw-medium text-dark">{{
                        applicant.score
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hired Column -->
      <div class="col-lg-3">
        <div class="pipeline-column">
          <div
            class="column-header d-flex justify-content-between align-items-center mb-3 p-3 rounded-top"
            style="background-color: #dcfce7; border-left: 4px solid #10b981"
          >
            <div class="d-flex align-items-center">
              <div
                class="rounded-circle me-2"
                style="width: 8px; height: 8px; background-color: #10b981"
              ></div>
              <span class="fw-medium">Hired</span>
            </div>
            <div class="d-flex align-items-center">
              <span class="badge bg-success-subtle text-success me-2">3</span>
              <button class="btn btn-sm btn-link text-muted p-0">
                <i class="bi bi-three-dots"></i>
              </button>
            </div>
          </div>

          <div class="column-content">
            <div
              v-for="applicant in getApplicantsByStage('Hired')"
              :key="applicant.id"
              class="applicant-card card border-0 shadow-sm mb-3"
            >
              <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                  <img
                    :src="applicant.avatar"
                    :alt="applicant.name"
                    class="rounded-circle me-3"
                    style="width: 40px; height: 40px"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-0">{{ applicant.name }}</h6>
                    <button
                      class="btn btn-link text-primary p-0 small"
                      @click="viewProfile(applicant.id)"
                    >
                      View Profile
                    </button>
                  </div>
                </div>
                <div class="row g-2 small text-muted">
                  <div class="col-6">
                    <div>Applied on</div>
                    <div class="fw-medium text-dark">
                      {{ applicant.appliedDate }}
                    </div>
                  </div>
                  <div class="col-6">
                    <div>Score</div>
                    <div class="d-flex align-items-center">
                      <i class="bi bi-star-fill text-warning me-1"></i>
                      <span class="fw-medium text-dark">{{
                        applicant.score
                      }}</span>
                    </div>
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
import { ref, computed, inject } from "vue";

defineEmits(["switchView"]);

const viewApplicantDetails = inject("viewApplicantDetails");
const searchQuery = ref("");

const applicants = ref([
  // In Review
  {
    id: 1,
    name: "Jake Gyll",
    stage: "In Review",
    score: "4.0",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+jake",
  },
  {
    id: 2,
    name: "Jenny Wilson",
    stage: "In Review",
    score: "3.8",
    appliedDate: "13 July, 2021",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+jenny",
  },
  {
    id: 3,
    name: "Jacob Jones",
    stage: "In Review",
    score: "3.5",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+jacob",
  },
  {
    id: 4,
    name: "Wade Warren",
    stage: "In Review",
    score: "3.2",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+wade",
  },

  // Shortlisted
  {
    id: 5,
    name: "Jane Cooper",
    stage: "Shortlisted",
    score: "4.2",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+woman+jane",
  },
  {
    id: 6,
    name: "Courtney Henry",
    stage: "Shortlisted",
    score: "4.1",
    appliedDate: "13 July, 2021",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+courtney",
  },

  // Interview
  {
    id: 7,
    name: "Floyd Miles",
    stage: "Interview",
    score: "4.5",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+floyd",
  },
  {
    id: 8,
    name: "Devon Lane",
    stage: "Interview",
    score: "4.3",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+devon",
  },
  {
    id: 9,
    name: "Marvin McKinney",
    stage: "Interview",
    score: "4.4",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+marvin",
  },

  // Hired
  {
    id: 10,
    name: "Annette Black",
    stage: "Hired",
    score: "4.8",
    appliedDate: "13 July, 2021",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+annette",
  },
  {
    id: 11,
    name: "Brooklyn Simmons",
    stage: "Hired",
    score: "4.6",
    appliedDate: "13 July, 2021",
    avatar:
      "/placeholder.svg?height=40&width=40&query=professional+woman+brooklyn",
  },
  {
    id: 12,
    name: "Ronald Richards",
    stage: "Hired",
    score: "4.7",
    appliedDate: "13 July, 2021",
    avatar: "/placeholder.svg?height=40&width=40&query=professional+man+ronald",
  },
]);

const getApplicantsByStage = (stage) => {
  return applicants.value.filter((applicant) => applicant.stage === stage);
};

const viewProfile = (applicantId) => {
  console.log("Viewing profile for applicant:", applicantId);
  if (viewApplicantDetails) {
    viewApplicantDetails(applicantId);
  }
};
</script>

<style scoped>
.pipeline-column {
  min-height: 600px;
}

.column-content {
  max-height: 500px;
  overflow-y: auto;
}

.applicant-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
}

.applicant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
</style>

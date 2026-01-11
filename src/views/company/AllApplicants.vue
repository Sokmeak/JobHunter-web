<template>
  <div class="all-applicants">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 class="mb-1 fw-bold">All Applicants</h2>
        <p class="text-muted mb-0">Manage and review all job applications</p>
      </div>

      <div class="d-flex align-items-center gap-3">
        <!-- Export Button -->
        <div class="dropdown">
          <button
            class="btn btn-outline-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-download me-2"></i>Export
          </button>
          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#" @click="exportData('csv')"
                >Export as CSV</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="exportData('excel')"
                >Export as Excel</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click="exportData('pdf')"
                >Export as PDF</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- View Toggle and Filters -->
    <div class="card border-0 shadow-sm mb-4">
      <div class="card-body p-4">
        <div class="row g-3 align-items-center">
          <div class="col-md-3">
            <div class="btn-group w-100">
              <button
                type="button"
                class="btn"
                :class="
                  currentView === 'table'
                    ? 'btn-primary'
                    : 'btn-outline-secondary'
                "
                @click="switchView('table')"
              >
                <i class="bi bi-table me-1"></i>Table
              </button>
              <button
                type="button"
                class="btn"
                :class="
                  currentView === 'pipeline'
                    ? 'btn-primary'
                    : 'btn-outline-secondary'
                "
                @click="switchView('pipeline')"
              >
                <i class="bi bi-kanban me-1"></i>Pipeline
              </button>
            </div>
          </div>
          <div class="col-md-3">
            <select class="form-select" v-model="jobFilter">
              <option value="">All Jobs</option>
              <option value="1">Senior Frontend Developer</option>
              <option value="2">UX Designer</option>
              <option value="3">Backend Developer</option>
              <option value="4">Product Manager</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" v-model="stageFilter">
              <option value="">All Stages</option>
              <option value="Applied">Applied</option>
              <option value="In Review">In Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview">Interview</option>
              <option value="Hired">Hired</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" v-model="dateFilter">
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
          <div class="col-md-2">
            <button
              class="btn btn-outline-secondary w-100"
              @click="clearFilters"
            >
              <i class="bi bi-x-circle me-1"></i>Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Area -->
    <div class="content-area">
      <ApplicantsTable
        v-if="currentView === 'table'"
        :view-mode="currentView"
      />
      <ApplicantsPipeline
        v-else-if="currentView === 'pipeline'"
        :view-mode="currentView"
      />
    </div>

    <!-- Applicant Details Modal -->
    <div
      v-if="showApplicantDetails"
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Applicant Details</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeApplicantDetails"
            ></button>
          </div>
          <div class="modal-body">
            <ApplicantDetails
              v-if="selectedApplicantId"
              :applicant-id="selectedApplicantId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useApplicantStore } from "@/stores/company/applicantStore";
import ApplicantsTable from "@/components/company/applicants/ApplicantsTable.vue";
import ApplicantsPipeline from "@/components/company/applicants/ApplicantsPipeline.vue";
import ApplicantDetails from "@/components/company/applicants/ApplicantDetails.vue";

const store = useApplicantStore();
const {
  currentView,
  jobFilter,
  stageFilter,
  dateFilter,
  showApplicantDetails,
  selectedApplicantId,
} = storeToRefs(store);

const {
  switchView,
  clearFilters,
  exportData,
  viewApplicantDetails,
  closeApplicantDetails,
} = store;

// Provide to child components
import { provide } from "vue";
provide("viewApplicantDetails", viewApplicantDetails);
</script>

<style scoped>
.form-select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}
.modal.show {
  display: block !important;
}
</style>

<template>
  <div class="job-details-page">
    <!-- Job Overview -->
    <div class="card mb-4">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h4 class="fw-bold mb-2">{{ job.title }}</h4>
            <div class="d-flex align-items-center gap-3 mb-3">
              <span class="badge bg-success">{{ job.type }}</span>
              <span class="text-muted">{{ job.department }}</span>
              <span class="text-muted">{{ job.datePosted }}</span>
            </div>
          </div>
          <span :class="getStatusClass(job.status)">
            {{ job.status }}
          </span>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="mb-3">
              <h6 class="fw-bold text-muted small">SALARY</h6>
              <p class="mb-0">{{ job.salary || "Competitive" }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="mb-3">
              <h6 class="fw-bold text-muted small">DEADLINE</h6>
              <p class="mb-0">{{ job.dueDate }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Description -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Job Description</h5>
        <p class="text-muted">{{ job.description }}</p>
      </div>
    </div>

    <!-- Responsibilities -->
    <div
      class="card mb-4"
      v-if="job.responsibilities && job.responsibilities.length"
    >
      <div class="card-body">
        <h5 class="fw-bold mb-3">Key Responsibilities</h5>
        <ul class="list-unstyled">
          <li
            v-for="(responsibility, index) in job.responsibilities"
            :key="index"
            class="mb-2"
          >
            <i class="bi bi-check-circle text-success me-2"></i>
            {{ responsibility }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Requirements -->
    <div class="card mb-4" v-if="job.requirements && job.requirements.length">
      <div class="card-body">
        <h5 class="fw-bold mb-3">Requirements</h5>
        <ul class="list-unstyled">
          <li
            v-for="(requirement, index) in job.requirements"
            :key="index"
            class="mb-2"
          >
            <i class="bi bi-dot text-primary me-2"></i>
            {{ requirement }}
          </li>
        </ul>
      </div>
    </div>

    <!-- Perks & Benefits -->
    <div
      class="row"
      v-if="
        (job.perks && job.perks.length) || (job.benefits && job.benefits.length)
      "
    >
      <div class="col-md-6" v-if="job.perks && job.perks.length">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-3">Perks</h5>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="perk in job.perks"
                :key="perk"
                class="badge bg-primary"
              >
                {{ perk }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6" v-if="job.benefits && job.benefits.length">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-3">Benefits</h5>
            <div class="d-flex flex-wrap gap-2">
              <span
                v-for="benefit in job.benefits"
                :key="benefit"
                class="badge bg-success"
              >
                {{ benefit }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobDetailsPage",
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getStatusClass(status) {
      const classes = {
        Live: "badge bg-success",
        Draft: "badge bg-warning",
        Closed: "badge bg-danger",
        Paused: "badge bg-secondary",
      };
      return classes[status] || "badge bg-secondary";
    },
  },
};
</script>

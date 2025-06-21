<template>
  <div class="job-analytics">
    <!-- Quick Stats -->
    <div class="row text-center mb-4">
      <div class="col-6 mb-3">
        <h4 class="fw-bold text-primary mb-1">{{ analytics.totalViews }}</h4>
        <small class="text-muted">Total Views</small>
      </div>
      <div class="col-6 mb-3">
        <h4 class="fw-bold text-success mb-1">{{ analytics.applications }}</h4>
        <small class="text-muted">Applications</small>
      </div>
      <div class="col-6">
        <h4 class="fw-bold text-warning mb-1">
          {{ analytics.conversionRate }}%
        </h4>
        <small class="text-muted">Conversion</small>
      </div>
      <div class="col-6">
        <h4 class="fw-bold text-info mb-1">{{ analytics.avgTimeToHire }}</h4>
        <small class="text-muted">Avg. Days</small>
      </div>
    </div>

    <!-- Top Performing Jobs -->
    <div class="mb-4">
      <h6 class="fw-bold mb-3">Top Performing Jobs</h6>
      <div class="list-group list-group-flush">
        <div
          class="list-group-item border-0 px-0 py-2"
          v-for="job in topJobs"
          :key="job.id"
        >
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1 fw-semibold">{{ job.title }}</h6>
              <small class="text-muted"
                >{{ job.applications }} applications</small
              >
            </div>
            <div class="text-end">
              <div class="progress" style="width: 60px; height: 6px">
                <div
                  class="progress-bar bg-primary"
                  :style="{ width: job.performance + '%' }"
                ></div>
              </div>
              <small class="text-muted">{{ job.performance }}%</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Application Sources -->
    <div>
      <h6 class="fw-bold mb-3">Application Sources</h6>
      <div class="mb-2" v-for="source in applicationSources" :key="source.name">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <small class="fw-semibold">{{ source.name }}</small>
          <small class="text-muted">{{ source.percentage }}%</small>
        </div>
        <div class="progress" style="height: 6px">
          <div
            class="progress-bar"
            :class="source.color"
            :style="{ width: source.percentage + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "JobAnalytics",
  setup() {
    const analytics = ref({
      totalViews: 12847,
      applications: 1247,
      conversionRate: 9.7,
      avgTimeToHire: 18,
    });

    const topJobs = ref([
      {
        id: 1,
        title: "Frontend Developer",
        applications: 45,
        performance: 85,
      },
      {
        id: 2,
        title: "UX Designer",
        applications: 32,
        performance: 72,
      },
      {
        id: 3,
        title: "Product Manager",
        applications: 28,
        performance: 68,
      },
      {
        id: 4,
        title: "Backend Developer",
        applications: 23,
        performance: 55,
      },
    ]);

    const applicationSources = ref([
      {
        name: "Company Website",
        percentage: 45,
        color: "bg-primary",
      },
      {
        name: "LinkedIn",
        percentage: 30,
        color: "bg-info",
      },
      {
        name: "Indeed",
        percentage: 15,
        color: "bg-success",
      },
      {
        name: "Referrals",
        percentage: 10,
        color: "bg-warning",
      },
    ]);

    return {
      analytics,
      topJobs,
      applicationSources,
    };
  },
};
</script>

<style scoped>
.progress {
  border-radius: 3px;
}

.progress-bar {
  border-radius: 3px;
}
</style>

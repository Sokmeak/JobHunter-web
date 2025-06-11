<template>
  <div class="job-details" v-if="job">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-secondary me-3" @click="goBack">
          <i class="bi bi-arrow-left"></i>
        </button>
        <div>
          <h2 class="fw-bold mb-0">{{ job.title }}</h2>
          <p class="text-muted mb-0">{{ job.department }} • {{ job.type }}</p>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary">
          <i class="bi bi-pencil me-1"></i>
          Edit Job
        </button>
        <button class="btn btn-outline-danger">
          <i class="bi bi-trash me-1"></i>
          Delete Job
        </button>
      </div>
    </div>

    <div class="row">
      <!-- Main Content -->
      <div class="col-lg-8">
        <JobDetailsPage :job="job" />
      </div>

      <!-- Sidebar -->
      <div class="col-lg-4">
        <!-- Job Stats -->
        <div class="card mb-4">
          <div class="card-body">
            <h6 class="fw-bold mb-3">Job Statistics</h6>
            <div class="row text-center">
              <div class="col-6 mb-3">
                <h3 class="fw-bold text-primary mb-1">{{ job.applicants }}</h3>
                <small class="text-muted">Applicants</small>
              </div>
              <div class="col-6 mb-3">
                <h3 class="fw-bold text-success mb-1">
                  {{ job.views || 2342 }}
                </h3>
                <small class="text-muted">Views</small>
              </div>
              <div class="col-6">
                <h3 class="fw-bold text-warning mb-1">{{ job.capacity }}</h3>
                <small class="text-muted">Capacity</small>
              </div>
              <div class="col-6">
                <h3 class="fw-bold text-info mb-1">
                  {{ Math.round((job.applicants / job.capacity) * 100) }}%
                </h3>
                <small class="text-muted">Fill Rate</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Applicants -->
        <div class="card">
          <div class="card-header bg-white border-bottom">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="mb-0 fw-bold">Recent Applicants</h6>
              <router-link
                to="/company/applicants"
                class="text-primary text-decoration-none small"
              >
                View All
              </router-link>
            </div>
          </div>
          <div class="card-body p-0">
            <div class="list-group list-group-flush">
              <div
                class="list-group-item border-0 py-3"
                v-for="applicant in recentApplicants"
                :key="applicant.id"
              >
                <div class="d-flex align-items-center">
                  <img
                    :src="applicant.avatar"
                    class="rounded-circle me-3"
                    width="40"
                    height="40"
                    :alt="applicant.name"
                  />
                  <div class="flex-grow-1">
                    <h6 class="mb-1 fw-semibold">{{ applicant.name }}</h6>
                    <small class="text-muted"
                      >Applied {{ applicant.appliedDate }}</small
                    >
                  </div>
                  <span :class="getStageClass(applicant.stage)">
                    {{ applicant.stage }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import JobDetailsPage from "@/components/company/jobs/JobDetailsPage.vue";

export default {
  name: "JobDetails",
  components: {
    JobDetailsPage,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const job = ref(null);

    const recentApplicants = ref([
      {
        id: 1,
        name: "Jake Gyll",
        avatar: "/placeholder.svg?height=40&width=40",
        appliedDate: "2 days ago",
        stage: "In Review",
      },
      {
        id: 2,
        name: "Guy Hawkins",
        avatar: "/placeholder.svg?height=40&width=40",
        appliedDate: "3 days ago",
        stage: "Shortlisted",
      },
      {
        id: 3,
        name: "Cyndy Lillibridge",
        avatar: "/placeholder.svg?height=40&width=40",
        appliedDate: "1 week ago",
        stage: "Interview",
      },
    ]);

    // Mock job data - in real app, this would come from API
    const mockJobs = {
      1: {
        id: 1,
        title: "Social Media Assistant",
        department: "Design",
        type: "Full-Time",
        applicants: 19,
        capacity: 20,
        status: "Live",
        datePosted: "20 May 2020",
        dueDate: "24 May 2020",
        salary: "$75k-$85k USD",
        description:
          "Stripe is looking for Social Media Marketing expert to help manage our online networks. As a Social Media Assistant, you will be responsible for developing and implementing our Social Media strategy in order to increase our online presence and improve our marketing and sales efforts.",
        responsibilities: [
          "Community engagement to ensure that is supported and actively represented online",
          "Focus on social media content development and publication",
          "Marketing and strategy support",
          "Stay up to date with the latest social media best practices and technologies",
        ],
        requirements: [
          "Bachelor's degree in Marketing, Communications, or related field",
          "2+ years of experience in social media marketing",
          "Excellent written and verbal communication skills",
          "Strong analytical and project management skills",
        ],
        perks: [
          "Full Healthcare",
          "Unlimited Vacation",
          "Skill Development",
          "Team Summits",
        ],
        benefits: [
          "Health Insurance",
          "Dental Insurance",
          "Paid Time Off",
          "Retirement Plan",
        ],
      },
    };

    onMounted(() => {
      const jobId = parseInt(route.params.id);
      job.value = mockJobs[jobId] || null;
    });

    const getStageClass = (stage) => {
      const classes = {
        "In Review": "badge bg-warning",
        Shortlisted: "badge bg-primary",
        Interview: "badge bg-info",
        Hired: "badge bg-success",
      };
      return classes[stage] || "badge bg-secondary";
    };

    const goBack = () => {
      router.push("/company/jobs");
    };

    return {
      job,
      recentApplicants,
      getStageClass,
      goBack,
    };
  },
};
</script>

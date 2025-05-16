<template>
  <section class="latest-jobs py-5 bg-light">
    <div class="container">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">
          Latest <span class="cyan-accent-color">jobs open</span>
        </h2>
        <a href="#" class="text-decoration-none primary-color">
          Show all jobs <i class="bi bi-arrow-right"></i
        ></a>
      </div>

      <div class="row g-4">
        <div class="col-md-6" v-for="(job, index) in latestJobs" :key="index">
          <div class="card border-0 shadow-sm" @click="selectJob(job.id)">
            <div class="card-body p-4">
              <div class="d-flex">
                <div class="company-logo me-3">
                  <img
                    :src="job.logo"
                    :alt="job.company"
                    class="rounded"
                    width="50"
                    height="50"
                  />
                </div>
                <div class="flex-grow-1">
                  <h5 class="card-title mb-1">{{ job.title }}</h5>
                  <p class="text-muted small mb-2">
                    {{ job.company }} • {{ job.location }}
                  </p>

                  <div class="d-flex flex-wrap gap-2 mb-3">
                    <span
                      v-for="(tag, tagIndex) in job.tags"
                      :key="tagIndex"
                      class="badge bg-light text-dark"
                      >{{ tag }}</span
                    >
                  </div>

                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <span class="badge bg-light text-dark me-2">{{
                        job.type
                      }}</span>
                      <span class="text-muted small">{{ job.postedTime }}</span>
                    </div>
                    <RouterLink
                      to="/jobDes"
                      class="btn btn-md btn-outline-primary applyButton"
                      >Apply</RouterLink
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from "vue";

const latestJobs = ref([
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Figma",
    location: "New York",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    tags: ["Marketing", "Social Media"],
    postedTime: "2 days ago",
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/1200px-Dropbox_Icon.svg.png",
    tags: ["Design", "Branding"],
    postedTime: "3 days ago",
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Stripe",
    location: "Remote",
    type: "Full Time",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
    tags: ["Frontend", "JavaScript"],
    postedTime: "1 day ago",
  },
  {
    id: 4,
    title: "UI Designer",
    company: "Webflow",
    location: "San Francisco",
    type: "Full Time",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVrNlPpznFbABwrCPJMvjSaSYMSsza5r5BhA&s",
    tags: ["Design", "UI/UX"],
    postedTime: "5 days ago",
  },
]);
const selectedJobId = ref(null);
const selectJob = (id) => {
  selectedJobId.value = id;
  console.log("Selected Job ID:", id);
};

// Convert latestJobs to options for a select dropdown
const jobOptions = computed(() =>
  latestJobs.value.map((job) => ({
    value: job.id,
    label: `${job.title} at ${job.company}`,
  }))
);

// Get the selected job object
const selectedJob = computed(() =>
  latestJobs.value.find((job) => job.id === selectedJobId.value)
);
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.cyan-accent-color {
  color: var(--cyan-accent-color);
}
.primary-color {
  color: var(--primary-color);
}
.btn-outline-primary {
  border-color: var(--primary-color);
  color: var(--primary-color);
}
.applyButton:hover {
  background-color: var(--primary-color);
  color: white;
}
.card:hover {
  transform: translateY(-5px);

  transition: transform 0.3s ease;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>

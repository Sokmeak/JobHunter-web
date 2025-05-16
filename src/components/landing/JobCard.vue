<template>
  <div class="card h-100 border-0 shadow-sm" @mouseover="getJobId(job.id)">
    <div class="card-body p-4">
      <div class="d-flex align-items-center mb-3">
        <div class="company-logo me-3">
          <img
            :src="job.logo"
            :alt="job.company"
            class="rounded"
            width="40"
            height="40"
          />
        </div>
        <div>
          <span class="badge bg-light text-dark">{{ job.type }}</span>
        </div>
      </div>

      <h5 class="card-item card-title mb-1">{{ job.title }}</h5>
      <p class="text-muted small mb-3">
        {{ job.company }} • {{ job.location }}
      </p>

      <p class="card-item card-text small text-muted mb-3">
        {{ job.description }}
      </p>

      <div class="card-item d-flex flex-wrap gap-2 mb-3">
        <span
          v-for="(tag, tagIndex) in job.tags"
          :key="tagIndex"
          class="badge bg-light text-dark"
          >{{ tag }}</span
        >
      </div>

      <!-- Actions -->
      <div class="card-item d-flex justify-content-between">
        <RouterLink
          to="/jobDes"
          class="apply-btn btn btn-md btn-outline-primary"
          >Apply</RouterLink
        >
        <button
          class="btn btn-md btn-link text-muted bookmark"
          @click="toggleBookmark"
        >
          <i :class="bookmarkIcon"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";

// Props definition
const props = defineProps({
  job: {
    type: Object,
    required: true,
  },
});

// Emit events
const emit = defineEmits(["job-selected"]);

// Reactive state
const bookmarked = ref(false);

// Computed properties
const bookmarkIcon = computed(() => {
  return bookmarked.value ? "bi bi-bookmark-fill" : "bi bi-bookmark";
});

// Methods
const toggleBookmark = () => {
  bookmarked.value = !bookmarked.value;

  // Optional: persist to localStorage
  const saved = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
  if (bookmarked.value) {
    saved.push(props.job.id); // assuming job has `id`
  } else {
    const index = saved.indexOf(props.job.id);
    if (index !== -1) saved.splice(index, 1);
  }
  localStorage.setItem("bookmarkedJobs", JSON.stringify(saved));
};

const getJobId = (id) => {
  // Emit the job ID when hovered
  emit("job-selected", id);

  // You can also do additional logic here if needed
  console.log("Job hovered:", id);
};

// Lifecycle hooks
onMounted(() => {
  // Check if job is already bookmarked
  const saved = JSON.parse(localStorage.getItem("bookmarkedJobs") || "[]");
  if (saved.includes(props.job.id)) {
    bookmarked.value = true;
  }
});
</script>

<style scoped>
.card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.bi {
  color: #4640de;
}

.btn-outline-primary {
  border-color: #4640de;
  color: #4640de;
}

.card:hover {
  transform: translateY(-5px);
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.job-title {
  transition: color 0.2s;
}

.job-title:hover {
  color: #4640de !important;
}

.company-link {
  transition: color 0.2s;
}

.company-link:hover {
  color: #4640de !important;
}

.apply-btn {
  transition: all 0.2s;
}

.apply-btn:hover {
  background-color: #4640de;
  color: white;
}
</style>

<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Recent Applications History</h5>

      <div class="applications-list">
        <ApplicationItem
          v-for="application in applications"
          :key="application.id"
          :application="application"
        />
      </div>
      <div class="text-center mt-4">
        <a
          href="#"
          class="text-decoration-none text-primary d-inline-flex align-items-center"
        >
          View all applications history
          <i class="bi bi-arrow-right ms-1"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ApplicationItem from "@/components/Applicants/dashboard/ApplicationItem.vue";

export default {
  name: "ApplicationHistory",
  components: {
    ApplicationItem,
  },
  props: {
    applications: {
      type: Array,
      required: true,
    },
  },
};
</script>

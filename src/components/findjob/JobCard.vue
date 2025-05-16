<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="me-3" style="width: 48px; height: 48px">
          <div
            class="bg-light rounded d-flex align-items-center justify-content-center h-100"
          >
            <img
              :src="getCompanyLogo(job.company)"
              :alt="`${job.company} logo`"
              class="img-fluid"
              style="max-width: 40px; max-height: 40px"
            />
          </div>
        </div>

        <div class="flex-grow-1">
          <h3 class="fs-5 fw-semibold mb-0">{{ job.title }}</h3>
          <p class="text-secondary small mb-0">
            {{ job.company }} • {{ job.location }}
          </p>
        </div>

        <div>
          <RouterLink to="/jobDes" class="btn btn-primary"
            >Apply</RouterLink
          >
        </div>
      </div>
    </div>

    <div
      class="card-footer bg-white d-flex justify-content-between align-items-center"
    >
      <div class="d-flex" style="gap: 0.5rem">
        <span
          v-for="(tag, index) in job.tags"
          :key="index"
          :class="[
            'badge rounded-pill px-3 py-2',
            index === 0
              ? 'bg-success bg-opacity-10 text-success'
              : index === 1
              ? 'bg-warning bg-opacity-10 text-warning'
              : 'bg-primary bg-opacity-10 text-primary',
          ]"
        >
          {{ tag }}
        </span>
      </div>

      <div class="small text-secondary">
        <span class="fw-medium" :class="{ 'text-success': job.applied > 0 }">
          {{ job.applied }} applied
        </span>
        of {{ job.capacity }} capacity
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  job: Object,
});

// In a real app, you would use actual company logos
const getCompanyLogo = (company) => {
  const logos = {
    Nomad:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    Dropbox:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    Terraform:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    Revolut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    Canva:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    ClassPass:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
    Pitch:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png",
  };

  return (
    logos[company] ||
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E8FQZgvdXeGyMD4bsP7uoI0UDcGJuH.png"
  );
};
</script>

<style lang="scss" scoped>
@use "@/style/variables.css" as *; /* <-- important */

.btn-primary {
  background-color: var(--primary-color);
}
.primary-color {
  background-color: var(--primary-color);
}
</style>

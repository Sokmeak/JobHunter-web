<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Social Links</h5>
        <button class="btn btn-link text-primary p-0">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <div v-for="(social, index) in socialLinks" :key="index" class="social-item mb-3">
        <p class="text-muted mb-1">{{ social.platform }}</p>
        <p class="mb-0">{{ social.url }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SocialLinks',
  props: {
    socialLinks: {
      type: Array,
      required: true
    }
  }
}
</script>
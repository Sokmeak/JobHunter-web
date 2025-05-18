<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Additional Details</h5>
        <button class="btn btn-link text-primary p-0">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <div class="detail-item mb-3">
        <p class="text-muted mb-1">Email</p>
        <p class="mb-0">{{ email }}</p>
      </div>
      <div class="detail-item mb-3">
        <p class="text-muted mb-1">Phone</p>
        <p class="mb-0">{{ phone }}</p>
      </div>
      <div class="detail-item">
        <p class="text-muted mb-1">Languages</p>
        <p class="mb-0">{{ languages.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdditionalDetails',
  props: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    languages: {
      type: Array,
      required: true
    }
  }
}
</script>
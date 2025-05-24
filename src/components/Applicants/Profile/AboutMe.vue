<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <h5 class="card-title">About Me</h5>
        <button class="btn btn-link text-primary p-0">
          <i class="bi bi-pencil"></i>
        </button>
      </div>
      <p>{{ about }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  props: {
    about: {
      type: String,
      required: true
    }
  }
}
</script>
<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Educations</h5>
        <div>
          <button class="btn btn-link text-primary p-0 me-2">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <education-item 
        v-for="(edu, index) in education" 
        :key="index" 
        :education="edu" 
      />

      <button v-if="moreCount > 0" class="btn btn-link text-primary">
        Show {{ moreCount }} more educations
      </button>
    </div>
  </div>
</template>

<script>
import EducationItem from './EducationItem.vue'

export default {
  name: 'EducationSection',
  components: {
    EducationItem
  },
  props: {
    education: {
      type: Array,
      required: true
    },
    moreCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
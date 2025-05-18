<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">Experiences</h5>
        <div>
          <button class="btn btn-link text-primary p-0 me-2">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>

      <experience-item 
        v-for="(experience, index) in experiences" 
        :key="index" 
        :experience="experience" 
      />

      <button v-if="moreCount > 0" class="btn btn-link text-primary">
        Show {{ moreCount }} more experiences
      </button>
    </div>
  </div>
</template>

<script>
import ExperienceItem from './ExperienceItem.vue'

export default {
  name: 'ExperienceSection',
  components: {
    ExperienceItem
  },
  props: {
    experiences: {
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
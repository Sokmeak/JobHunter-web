<template>
  <div class="experience-section">
    <h3 class="section-title">Experiences</h3>
    <div class="experience-list">
      <div
        v-for="experience in visibleExperiences"
        :key="experience.id"
        class="experience-item"
      >
        <div class="experience-logo">
          <AvatarWithFallback
            :src="experience.logo"
            :name="experience.company || 'Company'"
            :alt="experience.company"
            size="md"
            :rounded="true"
          />
        </div>
        <div class="experience-details">
          <h4 class="position-title">{{ experience.position }}</h4>
          <p class="company-info">
            {{ experience.company }} • {{ experience.type }} •
            {{ experience.duration }}
          </p>
          <p class="location">{{ experience.location }}</p>
          <p class="description">{{ experience.description }}</p>
        </div>
      </div>
    </div>

    <button
      v-if="experiences.length > 2"
      @click="toggleShowAll"
      class="show-more-btn"
    >
      {{
        showAll
          ? "Show less experiences"
          : `Show ${experiences.length - 2} more experiences`
      }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AvatarWithFallback from "../../common/AvatarWithFallback.vue";

const props = defineProps({
  experiences: {
    type: Array,
    required: true,
  },
});

const showAll = ref(false);

const visibleExperiences = computed(() => {
  return showAll.value ? props.experiences : props.experiences.slice(0, 2);
});

const toggleShowAll = () => {
  showAll.value = !showAll.value;
};
</script>

<style scoped>
.experience-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.experience-item {
  display: flex;
  gap: 16px;
}

.experience-logo {
  flex-shrink: 0;
}

.company-logo {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
  background-color: #f3f4f6;
}

.experience-details {
  flex: 1;
}

.position-title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
}

.company-info {
  font-size: 13px;
  color: #6b7280;
  margin: 0 0 4px 0;
}

.location {
  font-size: 12px;
  color: #9ca3af;
  margin: 0 0 8px 0;
}

.description {
  font-size: 14px;
  line-height: 1.5;
  color: #374151;
  margin: 0;
}

.show-more-btn {
  align-self: flex-start;
  padding: 8px 0;
  background: none;
  border: none;
  color: #4f46e5;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.show-more-btn:hover {
  color: #4338ca;
}

@media (max-width: 768px) {
  .experience-item {
    gap: 12px;
  }

  .company-logo {
    width: 40px;
    height: 40px;
  }
}
</style>

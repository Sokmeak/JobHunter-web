<template>
    <div class="education-section">
      <h3 class="section-title">Educations</h3>
      <div class="education-list">
        <div 
          v-for="education in visibleEducations" 
          :key="education.id"
          class="education-item"
        >
          <div class="education-logo">
            <img :src="education.logo" :alt="education.institution" class="institution-logo" />
          </div>
          <div class="education-details">
            <h4 class="institution-name">{{ education.institution }}</h4>
            <p class="degree-info">{{ education.degree }}</p>
            <p class="duration">{{ education.duration }}</p>
            <p v-if="education.description" class="description">{{ education.description }}</p>
          </div>
        </div>
      </div>
      
      <button 
        v-if="educations.length > 2" 
        @click="toggleShowAll"
        class="show-more-btn"
      >
        {{ showAll ? 'Show less educations' : `Show ${educations.length - 2} more educations` }}
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    educations: {
      type: Array,
      required: true
    }
  });
  
  const showAll = ref(false);
  
  const visibleEducations = computed(() => {
    return showAll.value ? props.educations : props.educations.slice(0, 2);
  });
  
  const toggleShowAll = () => {
    showAll.value = !showAll.value;
  };
  </script>
  
  <style scoped>
  .education-section {
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
  
  .education-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .education-item {
    display: flex;
    gap: 16px;
  }
  
  .education-logo {
    flex-shrink: 0;
  }
  
  .institution-logo {
    width: 48px;
    height: 48px;
    border-radius: 8px;
    object-fit: cover;
    background-color: #f3f4f6;
  }
  
  .education-details {
    flex: 1;
  }
  
  .institution-name {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 4px 0;
  }
  
  .degree-info {
    font-size: 13px;
    color: #6b7280;
    margin: 0 0 4px 0;
  }
  
  .duration {
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
    .education-item {
      gap: 12px;
    }
    
    .institution-logo {
      width: 40px;
      height: 40px;
    }
  }
  </style>
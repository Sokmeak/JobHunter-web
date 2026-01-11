<template>
    <div class="skills-section">
      <h3 class="section-title">Skills</h3>
      <div class="skills-list">
        <span 
          v-for="skill in skills" 
          :key="skill"
          class="skill-tag"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    skills: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .skills-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .section-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .skill-tag {
    padding: 6px 12px;
    background-color: #f0f9ff;
    color: #0369a1;
    border: 1px solid #e0f2fe;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    .skills-list {
      gap: 6px;
    }
    
    .skill-tag {
      font-size: 11px;
      padding: 4px 10px;
    }
  }
  </style>
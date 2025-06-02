<template>
    <div class="about-section">
      <h3 class="section-title">About Me</h3>
      <div class="about-content">
        <p v-for="(paragraph, index) in aboutParagraphs" :key="index" class="about-paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    about: {
      type: String,
      required: true
    }
  });
  
  const aboutParagraphs = computed(() => {
    return props.about.split('\n\n').filter(p => p.trim());
  });
  </script>
  
  <style scoped>
  .about-section {
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
  
  .about-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .about-paragraph {
    font-size: 14px;
    line-height: 1.6;
    color: #374151;
    margin: 0;
  }
  </style>
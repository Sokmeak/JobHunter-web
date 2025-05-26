<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div class="chart-title-section">
          <h3 class="chart-title">Job Categories</h3>
          <p class="chart-subtitle">Distribution of job postings by category</p>
        </div>
      </div>
      
      <div class="chart-content">
        <div class="categories-list">
          <div 
            v-for="(category, index) in categories" 
            :key="category.name"
            class="category-item"
          >
            <div class="category-info">
              <span class="category-name">{{ category.name }}</span>
            </div>
            <div class="category-bar-container">
              <div 
                class="category-bar"
                :style="{ 
                  width: (category.value / maxValue * 100) + '%',
                  backgroundColor: '#8b5cf6'
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  });
  
  const categories = computed(() => {
    return props.data.labels.map((label, index) => ({
      name: label,
      value: props.data.datasets[0].data[index]
    }));
  });
  
  const maxValue = computed(() => {
    return Math.max(...props.data.datasets[0].data);
  });
  </script>
  
  <style scoped>
  .chart-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .chart-header {
    margin-bottom: 20px;
  }
  
  .chart-title-section {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .chart-title {
    font-size: 16px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .chart-subtitle {
    font-size: 12px;
    color: #6b7280;
    margin: 0;
  }
  
  .chart-content {
    flex: 1;
  }
  
  .categories-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .category-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .category-info {
    min-width: 80px;
    text-align: right;
  }
  
  .category-name {
    font-size: 14px;
    color: #6b7280;
  }
  
  .category-bar-container {
    flex: 1;
    height: 20px;
    background-color: #f3f4f6;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }
  
  .category-bar {
    height: 100%;
    border-radius: 10px;
    transition: width 0.3s ease;
    background: linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%);
  }
  </style>
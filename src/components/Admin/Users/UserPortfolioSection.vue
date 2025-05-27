<template>
    <div class="portfolio-section">
      <h3 class="section-title">Portfolios</h3>
      <div class="portfolio-grid">
        <div 
          v-for="portfolio in portfolios" 
          :key="portfolio.id"
          class="portfolio-item"
        >
          <div class="portfolio-image">
            <img :src="portfolio.image" :alt="portfolio.title" class="project-image" />
          </div>
          <div class="portfolio-info">
            <h4 class="project-title">{{ portfolio.title }}</h4>
            <span class="project-category">{{ portfolio.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    portfolios: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  .portfolio-section {
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
  
  .portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .portfolio-item {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .portfolio-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
  
  .portfolio-image {
    aspect-ratio: 16/10;
    overflow: hidden;
  }
  
  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #f3f4f6;
  }
  
  .portfolio-info {
    padding: 16px;
  }
  
  .project-title {
    font-size: 14px;
    font-weight: 500;
    color: #111827;
    margin: 0 0 4px 0;
    line-height: 1.4;
  }
  
  .project-category {
    font-size: 12px;
    color: #6b7280;
  }
  
  @media (max-width: 768px) {
    .portfolio-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }
    
    .portfolio-info {
      padding: 12px;
    }
  }
  </style>
<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div class="chart-title-section">
          <h3 class="chart-title">User Distribution</h3>
          <p class="chart-subtitle">Breakdown of user types</p>
        </div>
      </div>
      
      <div class="chart-content">
        <div class="chart-container">
          <canvas ref="chartCanvas" class="chart-canvas"></canvas>
          
          <!-- Center labels -->
          <div class="center-labels">
            <div class="center-label job-seeker">Job Seeker-55%</div>
            <div class="center-label employer">Employer-45%</div>
          </div>
        </div>
        
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color" style="background-color: #10b981;"></div>
            <span class="legend-label">Employer - 45%</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  });
  
  const chartCanvas = ref(null);
  
  const drawChart = () => {
    const canvas = chartCanvas.value;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const size = 200;
    canvas.width = size * 2;
    canvas.height = size * 2;
    ctx.scale(2, 2);
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    // Chart settings
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = 80;
    const innerRadius = 50;
    
    // Data
    const data = props.data.datasets[0].data;
    const colors = props.data.datasets[0].backgroundColor;
    const total = data.reduce((sum, value) => sum + value, 0);
    
    let currentAngle = -Math.PI / 2; // Start from top
    
    // Draw segments
    data.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;
      
      // Draw outer arc
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
      ctx.closePath();
      ctx.fillStyle = colors[index];
      ctx.fill();
      
      currentAngle += sliceAngle;
    });
  };
  
  onMounted(() => {
    drawChart();
  });
  
  watch(() => props.data, () => {
    drawChart();
  }, { deep: true });
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .chart-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  .chart-canvas {
    width: 200px;
    height: 200px;
  }
  
  .center-labels {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    pointer-events: none;
  }
  
  .center-label {
    font-size: 12px;
    font-weight: 500;
    margin: 2px 0;
  }
  
  .center-label.job-seeker {
    color: #8b5cf6;
  }
  
  .center-label.employer {
    color: #10b981;
  }
  
  .chart-legend {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .legend-color {
    width: 12px;
    height: 12px;
    border-radius: 2px;
  }
  
  .legend-label {
    font-size: 12px;
    color: #6b7280;
  }
  </style>
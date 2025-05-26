<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div class="chart-title-section">
          <h3 class="chart-title">Job Posting</h3>
          <p class="chart-subtitle">Monthly job posting activity</p>
        </div>
      </div>
      
      <div class="chart-content">
        <canvas ref="chartCanvas" class="chart-canvas"></canvas>
        
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color" style="background-color: #f59e0b;"></div>
            <span class="legend-label">Job Posting</span>
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
    },
    period: {
      type: String,
      default: 'last-month'
    }
  });
  
  const chartCanvas = ref(null);
  
  const drawChart = () => {
    const canvas = chartCanvas.value;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 300 * 2;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 60, left: 40 };
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Data
    const data = props.data.datasets[0].data;
    const labels = props.data.labels;
    const maxValue = Math.max(...data);
    
    // Draw Y-axis grid lines and labels
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * i;
      const y = padding.top + chartHeight - (i / 5) * chartHeight;
      
      // Grid line
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
      
      // Label
      ctx.fillText(Math.round(value).toString(), padding.left - 10, y + 4);
    }
    
    // Draw bars
    const barWidth = chartWidth / labels.length * 0.6;
    const barSpacing = chartWidth / labels.length;
    
    ctx.fillStyle = '#f59e0b';
    
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * chartHeight;
      const x = padding.left + index * barSpacing + (barSpacing - barWidth) / 2;
      const y = padding.top + chartHeight - barHeight;
      
      // Draw rounded rectangle
      const radius = 4;
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + barWidth - radius, y);
      ctx.quadraticCurveTo(x + barWidth, y, x + barWidth, y + radius);
      ctx.lineTo(x + barWidth, y + barHeight);
      ctx.lineTo(x, y + barHeight);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
      ctx.fill();
    });
    
    // Draw X-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'center';
    
    labels.forEach((label, index) => {
      const x = padding.left + index * barSpacing + barSpacing / 2;
      ctx.fillText(label, x, height - 20);
    });
  };
  
  onMounted(() => {
    drawChart();
  });
  
  watch(() => props.data, () => {
    drawChart();
  }, { deep: true });
  
  watch(() => props.period, () => {
    drawChart();
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
    display: flex;
    flex-direction: column;
  }
  
  .chart-canvas {
    width: 100%;
    height: 300px;
    flex: 1;
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
<template>
    <div class="chart-wrapper">
      <div class="chart-header">
        <div class="chart-title-section">
          <h3 class="chart-title">Application Submitted</h3>
          <p class="chart-subtitle">Monthly application Submitted by user</p>
        </div>
        <div class="chart-value">1600</div>
      </div>
      
      <div class="chart-content">
        <canvas ref="chartCanvas" class="chart-canvas"></canvas>
        
        <!-- Tooltip -->
        <div 
          v-if="showTooltip" 
          class="chart-tooltip"
          :style="{ left: tooltipPosition.x + 'px', top: tooltipPosition.y + 'px' }"
        >
          <div class="tooltip-content">
            <div class="tooltip-label">Views</div>
            <div class="tooltip-value">{{ data.tooltip.views }}</div>
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
  const showTooltip = ref(false);
  const tooltipPosition = ref({ x: 0, y: 0 });
  
  const drawChart = () => {
    const canvas = chartCanvas.value;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = 300 * 2;
    ctx.scale(2, 2);
    
    const width = canvas.offsetWidth;
    const height = 300;
    const padding = { top: 20, right: 20, bottom: 40, left: 40 };
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart dimensions
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    // Data points
    const data = props.data.datasets[0].data;
    const labels = props.data.labels;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    
    // Calculate points
    const points = data.map((value, index) => ({
      x: padding.left + (index / (data.length - 1)) * chartWidth,
      y: padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight
    }));
    
    // Draw grid lines
    ctx.strokeStyle = '#f3f4f6';
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (i / 4) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();
    }
    
    // Draw Y-axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    
    for (let i = 0; i <= 4; i++) {
      const value = maxValue - (i / 4) * (maxValue - minValue);
      const y = padding.top + (i / 4) * chartHeight;
      ctx.fillText(Math.round(value).toString(), padding.left - 10, y + 4);
    }
    
    // Draw X-axis labels
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding.left + (index / (labels.length - 1)) * chartWidth;
      ctx.fillText(label, x, height - 10);
    });
    
    // Draw line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.beginPath();
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y);
      } else {
        // Create smooth curve
        const prevPoint = points[index - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
      }
    });
    ctx.stroke();
    
    // Draw area under curve
    ctx.fillStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartHeight);
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.lineTo(point.x, point.y);
      } else {
        const prevPoint = points[index - 1];
        const cpx = (prevPoint.x + point.x) / 2;
        ctx.quadraticCurveTo(cpx, prevPoint.y, point.x, point.y);
      }
    });
    ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
    ctx.closePath();
    ctx.fill();
    
    // Draw data points
    ctx.fillStyle = '#10b981';
    points.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
    
    // Add hover tooltip on a specific point (simulated)
    const tooltipPoint = points[4]; // 23 Jul point
    if (tooltipPoint) {
      // Draw tooltip indicator
      ctx.fillStyle = '#374151';
      ctx.beginPath();
      ctx.arc(tooltipPoint.x, tooltipPoint.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      
      // Show tooltip
      showTooltip.value = true;
      tooltipPosition.value = {
        x: tooltipPoint.x - 30,
        y: tooltipPoint.y - 60
      };
    }
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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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
  
  .chart-value {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
  }
  
  .chart-content {
    position: relative;
    flex: 1;
  }
  
  .chart-canvas {
    width: 100%;
    height: 300px;
  }
  
  .chart-tooltip {
    position: absolute;
    background-color: #374151;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    pointer-events: none;
    z-index: 10;
  }
  
  .chart-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #374151;
  }
  
  .tooltip-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
  }
  
  .tooltip-label {
    font-size: 10px;
    opacity: 0.8;
  }
  
  .tooltip-value {
    font-weight: 600;
  }
  </style>
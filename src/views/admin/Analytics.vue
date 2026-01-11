<template>
    <div class="analytics-page">
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Platform Analytics</h1>
          <p class="page-subtitle">Track User Activity and generate reports.</p>
        </div>
        
        <div class="header-controls">
          <div class="time-filter">
            <select v-model="selectedPeriod" class="period-select">
              <option value="last-week">Last Week</option>
              <option value="last-month">Last Month</option>
              <option value="last-quarter">Last Quarter</option>
              <option value="last-year">Last Year</option>
            </select>
            <ChevronDown class="select-icon" />
          </div>
          
          <button class="export-button" @click="exportReport">
            <Download class="button-icon" />
            <span>Export report</span>
          </button>
        </div>
      </div>
  
      <div class="analytics-grid">
        <div class="chart-container">
          <ApplicationSubmittedChart :data="applicationData" :period="selectedPeriod" />
        </div>
        
        <div class="chart-container">
          <JobPostingChart :data="jobPostingData" :period="selectedPeriod" />
        </div>
        
        <div class="chart-container">
          <UserDistributionChart :data="userDistributionData" />
        </div>
        
        <div class="chart-container">
          <JobCategoriesChart :data="jobCategoriesData" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { ChevronDown, Download } from 'lucide-vue-next';
  import ApplicationSubmittedChart from '@/components/Admin/Charts/ApplicationSubmittedChart.vue';
  import JobPostingChart from '@/components/Admin/Charts/JobPostingChart.vue';
  import UserDistributionChart from '@/components/Admin/Charts/UserDistributionChart.vue';
  import JobCategoriesChart from '@/components/Admin/Charts/JobCategoriesChart.vue';
  
  const selectedPeriod = ref('last-month');
  
  // Mock data - in a real app, this would come from an API
  const applicationData = ref({
    labels: ['19 Jul', '20 Jul', '21 Jul', '22 Jul', '23 Jul', '24 Jul', '25 Jul'],
    datasets: [{
      label: 'Applications',
      data: [350, 250, 150, 200, 500, 300, 600],
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4
    }],
    tooltip: {
      views: 243
    }
  });
  
  const jobPostingData = ref({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Job Posting',
      data: [38, 25, 8, 40, 30, 20],
      backgroundColor: '#f59e0b'
    }]
  });
  
  const userDistributionData = ref({
    labels: ['Job Seeker', 'Employer'],
    datasets: [{
      data: [55, 45],
      backgroundColor: ['#8b5cf6', '#10b981'],
      borderWidth: 0
    }]
  });
  
  const jobCategoriesData = ref({
    labels: ['Tech', 'Marketing', 'Finance', 'Health Care', 'Education', 'Other'],
    datasets: [{
      data: [85, 70, 45, 35, 25, 15],
      backgroundColor: '#8b5cf6'
    }]
  });
  
  const exportReport = () => {
    // Implement export functionality
    console.log('Exporting report for period:', selectedPeriod.value);
    // In a real app, this would generate and download a report
    alert('Report export functionality would be implemented here');
  };
  
  onMounted(() => {
    // Fetch analytics data based on selected period
    // fetchAnalyticsData(selectedPeriod.value);
  });
  </script>
  
  <style scoped>
  .analytics-page {
   padding: 1rem 1rem;
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .header-content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .page-title {
    font-size: 24px;
    font-weight: 600;
    color: #111827;
    margin: 0;
  }
  
  .page-subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }
  
  .header-controls {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  
  .time-filter {
    position: relative;
  }
  
  .period-select {
    appearance: none;
    padding: 10px 40px 10px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    background-color: white;
    cursor: pointer;
    min-width: 140px;
  }
  
  .select-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #6b7280;
    pointer-events: none;
  }
  
  .export-button {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    background-color: white;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    font-size: 14px;
    color: #374151;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .export-button:hover {
    background-color: #f9fafb;
  }
  
  .button-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
  
  .analytics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  
  .chart-container {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e5e7eb;
    padding: 24px;
  }
  
  @media (max-width: 1024px) {
    .analytics-grid {
      grid-template-columns: 1fr;
    }
    
    .page-header {
      flex-direction: column;
      align-items: stretch;
    }
    
    .header-controls {
      justify-content: space-between;
    }
  }
  
  @media (max-width: 640px) {
    .header-controls {
      flex-direction: column;
      align-items: stretch;
    }
  }
  </style>
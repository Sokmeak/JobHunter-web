<template>
    <div class="stat-card">
      <div class="title">{{ title }}</div>
      <div class="value">{{ value }}</div>
      <div class="change" :class="changeType">{{ change }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: String,
      value: String,
      change: String,
      changeType: String // e.g. 'positive' ou 'negative' pour la couleur
    }
  }
  </script>
  
  <style scoped>
  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(2, 2, 2, 0.05);
  }
  .title {
    font-weight: 600;
    color: #666;
  }
  .value {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .change.positive {
    color: green;
  }
  .change.negative {
    color: red;
  }
  .change.neutral {
    color: gold;
  }
  </style>
  
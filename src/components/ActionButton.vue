<template>
    <button class="action-btn">{{ label }}</button>
  </template>
  
  <script>
  export default {
    props: {
      label: String
    }
  }
  </script>
  
  <style scoped>
  .action-btn {
    background-color: white;
    border: 1px solid #ddd;
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }
  
  .action-btn:hover {
    background-color: #f0f0f0;
  }
  </style>
  
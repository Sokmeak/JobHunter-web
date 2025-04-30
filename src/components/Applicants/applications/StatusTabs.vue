<template>
    <div class="status-tabs mb-4">
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <a :class="['nav-link', { active: tab.active }]" href="#">
            {{ tab.name }} <span class="badge rounded-pill bg-light text-dark ms-1">({{ tab.count }})</span>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StatusTabs',
    props: {
      tabs: {
        type: Array,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .nav-tabs {
    border-bottom: 1px solid #dee2e6;
  }
  
  .nav-tabs .nav-link {
    color: #6c757d;
    border: none;
    padding: 10px 15px;
    margin-right: 5px;
  }
  
  .nav-tabs .nav-link.active {
    color: #5138ee;
    border-bottom: 2px solid #5138ee;
    font-weight: 500;
  }
  
  .badge {
    font-weight: normal;
  }
  </style>